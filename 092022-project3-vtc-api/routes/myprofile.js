const router = require("express").Router();
const controller = require("../controllers/user");

router.post("/", controller.getUser);

module.exports = router;
