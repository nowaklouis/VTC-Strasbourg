const db = require("../models");

const InfoTrajets = db.infoTrajets;

const getInfoTrajets = async (req, res) => {
  const infoTrajets = await InfoTrajets.findAll();
  res.status(200).json(infoTrajets);
};

const updateInfoTrajets = async (req, res) => {
  const keyToUpdate = Object.keys(req.body)[0];
  const result = await InfoTrajets.update(
    { line1: req.body[keyToUpdate] },
    {
      where: {
        name: keyToUpdate,
      },
    }
  );
  console.log(result[0]);
  if (result[0] !== 0) return res.status(200).send("Texte modifié");
  if (result[0] === 0) return res.status(404).send("Texte non modifiée");
};

module.exports = { getInfoTrajets, updateInfoTrajets };
