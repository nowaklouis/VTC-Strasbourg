const db = require("../models");
const datasUser = require("./user");
const datasCourse = require("./course");
const datasForfait = require("./forfait");
const datasPrice = require("./price");
const infoTrajets = require("./infoTrajets");

// db.connexion.sync({ force: true }).then(() => {
//     console.log("Resync Db");
//     datasUser(db);
//     datasCourse(db);
//     datasForfait(db);
//     datasPrice(db);
//     infoTrajets(db);
// });

db.connexion
    .sync({ force: true })
    .then(() => {
        console.log("Resync Db");
        return datasUser(db);
    })
    .then(() => {
        return datasCourse(db);
    })
    .then(() => {
        datasForfait(db);
        datasPrice(db);
        infoTrajets(db);
    });
