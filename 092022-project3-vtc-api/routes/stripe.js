const router = require("express").Router();
const controller = require("../controllers/stripe");

router.post("/", controller.getPaymentIntent);

router.post("/ok", controller.capturePayment);

router.post("/cancel", controller.cancelPayment);

module.exports = router;
