const router = require("express").Router();
const controller = require("../controllers/public");

router.get("/", controller.home);

module.exports = router;
