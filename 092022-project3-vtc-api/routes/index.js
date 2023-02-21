const publics = require("./public");
const auth = require("./auth");
const courses = require("./courses");
const user = require("./user");
const forfait = require("./forfait");
const price = require("./price");
const infoTrajets = require("./infoTrajets");
const stripe = require("./stripe");

const setupRoutes = (app) => {
  app.use("/", publics);
  app.use("/auth", auth);
  app.use("/courses", courses);
  app.use("/forfaits", forfait);
  app.use("/prices", price);
  app.use("/user", user);
  app.use("/infoTrajets", infoTrajets);
  app.use("/stripe", stripe);
};

module.exports = setupRoutes;
