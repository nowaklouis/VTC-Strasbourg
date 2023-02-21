const router = require("express").Router();
const controller = require("../controllers/forfait");
// const { verifyToken } = require("../middlewares");

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);

router.post("/", controller.postForfait);

router.delete("/:id", controller.deleteOne);

module.exports = router;
