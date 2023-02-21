const db = require("../models");
const mailjet = require("../services/mailer");
const dayjs = require("dayjs");
const { emailSender } = require("../config/mailer.config");
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

const Course = db.course;
const User = db.user;

const getAll = async (req, res) => {
    const courses = await Course.findAll({
        include: {
            model: User,
            attributes: ["firstname", "lastname", "email", "id"],
        },
    });

    res.status(200).json(courses);
};

const getOne = async (req, res) => {
    const course = await Course.findByPk(req.params.id, {
        include: {
            model: User,
            attributes: ["firstname", "lastname", "email", "id", "phone"],
        },
    });
    res.json(course);
};

const getByUser = async (req, res) => {
    const userCourses = await Course.findAll({
        include: {
            model: User,
            where: {
                email: req.query.email,
            },
        },
    });
    res.status(200).json(userCourses);
};

const postCourse = async (req, res) => {
    const {
        depAddress,
        destAddress,
        date,
        clientId,
        passengers,
        duration,
        price,
        distance,
        status,
        id_stripe,
    } = req.body;
    const course = await Course.create({
        depAddress,
        destAddress,
        date,
        clientId,
        passengers,
        duration,
        price,
        distance,
        status,
        id_stripe,
    });
    const user = await User.findByPk(clientId);

    //send bon de commande to the client
    await mailjet.post("send", { version: "v3.1" }).request({
        Messages: [
            {
                From: {
                    Email: emailSender,
                    Name: "VTC Strasbourg",
                },
                To: [
                    {
                        Email: user.email,
                        Name: "VTC Strasbourg",
                    },
                ],

                TemplateID: 4568650,
                TemplateLanguage: true,
                Subject: `VTC STRASBOURG - Bon de commande de la course course le ${dayjs(
                    date
                ).format("DD-MM-YYYY")} `,
                TextPart: "Bon de commande",
                Variables: {
                    date: dayjs(date).format("DD-MM-YYYY"),
                    heure: dayjs(date).format("HH:mm"),
                    depAddress: depAddress,
                    destAddress: destAddress,
                    duration: duration,
                    price: price,
                    distance: distance,
                    client: user.firstname,
                },
            },
        ],
    });

    //send email to driver to notify a new course has been created
    await mailjet.post("send", { version: "v3.1" }).request({
        Messages: [
            {
                From: {
                    Email: emailSender,
                    Name: "VTC Strasbourg",
                },
                To: [
                    {
                        Email: emailSender,
                        Name: "VTC Strasbourg",
                    },
                ],

                TemplateID: 4483064,
                TemplateLanguage: true,
                Subject: `VTC STRASBOURG - Demande de course le ${dayjs(
                    date
                ).format("DD-MM-YYYY")} `,
                TextPart: "test mail",
                Variables: {
                    date: dayjs(date).format("DD-MM-YYYY"),
                    heure: dayjs(date).format("HH:mm"),
                    depAddress: depAddress,
                    destAddress: destAddress,
                },
            },
        ],
    });

    res.status(201).json(course);
};

const deleteOne = async (req, res) => {
    const id = String(req.params.id);
    const result = await Course.destroy({
        where: {
            id: id,
        },
    });
    console.log(result);
    if (result === 0) return res.status(403).send("Course not found");
    res.sendStatus(200);
};

const validateCourse = async (req, res) => {
    const id = String(req.params.id);
    const course = await Course.findByPk(req.params.id);
    const { clientId, destAddress, depAddress, date } = course;
    const user = await User.findByPk(clientId);
    console.log(user);

    // route to accept a course
    if (req.body.validate === "accept") {
        await Course.update(
            { status: "accepted" },
            {
                where: {
                    id: id,
                },
            }
        );

        const { idForCapture } = req.body;

        try {
            const paymentIntent = await stripe.paymentIntents.capture(
                idForCapture
            );

            //send email to the client
            await mailjet.post("send", { version: "v3.1" }).request({
                Messages: [
                    {
                        From: {
                            Email: emailSender,
                            Name: "VTC Strasbourg",
                        },
                        To: [
                            {
                                Email: user.email,
                                Name: user.firstname + user.lastname,
                            },
                        ],

                        TemplateID: 4483652,
                        TemplateLanguage: true,
                        Subject: `Votre course du ${dayjs(date).format(
                            "DD-MM-YYYY"
                        )} a été acceptée par VTC Strasbourg`,
                        TextPart: "test mail",
                        Variables: {
                            client: user.firstname + " " + user.lastname,
                            date: dayjs(date).format("DD-MM-YYYY"),
                            heure: dayjs(date).format("HH:mm"),
                            depAddress: depAddress,
                            destAddress: destAddress,
                        },
                    },
                ],
            });

            return res.status(204).send({ paymentIntent });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }

    //route to decline a course
    if (req.body.validate === "decline") {
        await Course.update(
            { status: "declined" },
            {
                where: {
                    id: id,
                },
            }
        );

        const { idForCapture } = req.body;

        try {
            const paymentIntent = await stripe.paymentIntents.cancel(
                idForCapture
            );

            // send email to client
            await mailjet.post("send", { version: "v3.1" }).request({
                Messages: [
                    {
                        From: {
                            Email: emailSender,
                            Name: "VTC Strasbourg",
                        },
                        To: [
                            {
                                Email: user.email,
                                Name: user.firstname + user.lastname,
                            },
                        ],
                        TemplateID: 4483776,
                        TemplateLanguage: true,
                        Subject: "VTC",
                        Variables: {
                            client: user.firstname + " " + user.lastname,
                        },
                    },
                ],
            });

            //TODO refund stripe

            return res.status(204).send({ paymentIntent });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }
};

module.exports = {
    getAll,
    getOne,
    getByUser,
    postCourse,
    deleteOne,
    validateCourse,
};
