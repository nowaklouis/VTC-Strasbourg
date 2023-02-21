const router = require("express").Router();
const controller = require("../controllers/price");

router.get("/", controller.getPrices);

// validate token
router.put("/", controller.updatePrice);
// router.put("/hour");

module.exports = router;
