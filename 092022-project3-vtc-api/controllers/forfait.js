const db = require("../models");

const Forfait = db.forfait;

const getAll = async (req, res) => {
    const forfaits = await Forfait.findAll();
    res.status(200).json(forfaits);
};

const getOne = async (req, res) => {
    const forfait = await Forfait.findByPk(req.params.id);
    res.json(forfait);
};

const postForfait = async (req, res) => {
    const { departure, destination, title, price } = req.body;
    const forfait = await Forfait.create({
        departure,
        destination,
        title,
        price,
    });
    res.status(201).json(forfait);
};

const deleteOne = async (req, res) => {
    const id = String(req.params.id);
    const result = await Forfait.destroy({
        where: {
            id: id,
        },
    });
    console.log(result);
    if (result === 0) return res.status(403).send("Course not found");
    else return res.sendStatus(200);
};

module.exports = { getAll, getOne, postForfait, deleteOne };
