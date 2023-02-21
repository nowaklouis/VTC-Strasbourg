const { user } = require("../models");
const db = require("../models");

const User = db.user;

const getAll = async (req, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
};

const getCompte = async (req, res) => {

  if (req.query.email) {
    const user = await User.findOne({
      where: {
        email: req.query.email,
      },
    });
    if (user === null) return res.status(404).send("user not found");

    res.status(200).send({
      email: user.email,
      lastname: user.lastname,
      firstname: user.firstname,
      birthday: user.birthday,
      adress: user.adress,
      zipcode: user.zipcode,
      city: user.city,
      country: user.country,
      phone: user.phone,
      offer: user.offer,
    });
  }
};

const postUser = async (req, res) => {
  const {
    lastname,
    firstname,
    birthday,
    email,
    hashedpassword,
    adress,
    zipcode,
    city,
    country,
    phone,
    offer,
    role,
  } = req.body;

  const user = await User.create({
    lastname,
    firstname,
    birthday,
    email,
    hashedpassword,
    adress,
    zipcode,
    city,
    country,
    phone,
    offer,
    role,
  });
  res.status(201).json(user);
};

const getOne = async (req, res) => {
  //query one by email
  if (req.query.email) {
    const result = await User.findOne({
      where: {
        email: req.query.email,
      },
    });
    if (result === null) return res.status(404).send("user not found");

    const user = result.dataValues;
    delete user.hashedpassword;
    res.status(200).send(user);
  }

  //query one by id
  if (req.query.id) {
    const result = await User.findOne({
      where: {
        id: req.query.id,
      },
    });
    if (result === null) return res.status(404).send("user not found");

    const user = result.dataValues;
    delete user.hashedpassword;
    res.status(200).send(user);
  }
};

const putUser = async (req, res) => {
  console.log(req);
  await User.update(req.body, {
    where: { email: req.query.email },
  });
  res.status(200).send("donnée mis à jour");
};


const deleteUser = async (req, res) => {
  const email = String(req.query.email);
  const result = await User.destroy({
    where: {
      email: email,
    },
  });
  console.log(result);
  if (result === 0) return res.status(404).send("User not found");
  res.sendStatus(200);
};

module.exports = { getAll, postUser, getCompte, getOne, putUser, deleteUser };
