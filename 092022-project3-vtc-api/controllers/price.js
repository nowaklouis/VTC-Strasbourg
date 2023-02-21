const db = require("../models");

const Price = db.price;

const getPrices = async (req, res) => {
  const prices = await Price.findAll();
  res.status(200).json(prices);
};

//put request on envoit kmPrice ou hourPrice dans le body de la requête
const updatePrice = async (req, res) => {
  console.log(req.body);
  const keyToUpdate = Object.keys(req.body)[0];
  const result = await Price.update(
    { value: req.body[keyToUpdate] },
    {
      where: {
        name: keyToUpdate,
      },
    }
  );
  console.log(result[0]);
  if (result[0] !== 0) return res.status(200).send("Prix modifié");
  if (result[0] === 0)
    return res.status(404).send("valeur non modifiée ou inexistante");
};

// const getOne = async (req, res) => {
//     const forfait = await Forfait.findByPk(req.params.id);
//     res.json(forfait);
// };

module.exports = { getPrices, updatePrice };
