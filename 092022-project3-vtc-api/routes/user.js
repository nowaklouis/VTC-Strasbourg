const router = require("express").Router();
const controller = require("../controllers/user");
const { verifySignUp } = require("../middlewares/index");

router.get("/", controller.getAll);

router.get("/compte", controller.getCompte);
router.get("/user", controller.getOne);

router.post("/", verifySignUp.checkEmailUser, controller.postUser);

router.put("/:email", controller.putUser);

router.delete("/:email", controller.deleteUser);

module.exports = router;
