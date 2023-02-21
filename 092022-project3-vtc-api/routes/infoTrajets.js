const router = require("express").Router();
const controller = require("../controllers/infoTrajets");

router.get("/", controller.getInfoTrajets);
router.put("/", controller.updateInfoTrajets);

module.exports = router;
