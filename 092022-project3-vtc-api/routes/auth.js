const controller = require("../controllers/auth");
const { verifySignUp } = require("../middlewares");
const router = require("express").Router();

router.post("/signin", controller.signin);
router.post("/signup", verifySignUp.checkEmailUser, controller.signup);

module.exports = router;
