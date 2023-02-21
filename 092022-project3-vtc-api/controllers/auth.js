// eslint-disable-next-line no-unused-vars
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
const config = require("../config/auth.config");

const User = db.user;

const signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.hashedpassword
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      const token = jwt.sign({ email: user.email }, config.secret, {
        expiresIn: 86400,
      });

      console.log(res);
      res.status(200).send({
        email: user.email,
        accessToken: token,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
        id: user.id,
        line1: user.adress,
        city: user.city,
        postal_code: user.zipcode,
        country: user.country,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const signup = async (req, res) => {
  const {
    email,
    password,
    lastname,
    firstname,
    phone,
    birthday,
    adress,
    zipcode,
    city,
    country,
    offer,
    role,
  } = req.body;
  const user = await User.create({
    email: email,
    hashedpassword: bcrypt.hashSync(password, 8),
    lastname: lastname,
    firstname: firstname,
    phone: phone,
    birthday: birthday,
    adress: adress,
    zipcode: zipcode,
    city: city,
    country: country,
    offer: offer,
    role: role,
  });
  console.log(user);
  res.status(200).json({ message: "crée" });
};

module.exports = { signin, signup };
