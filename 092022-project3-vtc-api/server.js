const express = require("express");
const cors = require("cors");

const app = express();
const env = require("./config/env");
const setupRoutes = require("./routes");
// eslint-disable-next-line no-unused-vars
const datasApp = require("./datas/index");

app.use(cors());
app.use(express.json());

setupRoutes(app);

const server = app.listen(env.PORT, env.HOSTNAME, () => {
  console.log(`Serveur turn to ${env.HOSTNAME}:${env.PORT}`);
});

module.exports = server;
