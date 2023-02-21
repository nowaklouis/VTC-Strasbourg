const router = require("express").Router();
const controller = require("../controllers/courses");

router.get("/compte/", controller.getByUser);
router.get("/", controller.getAll);
router.get("/:id", controller.getOne);

router.post("/", controller.postCourse);
router.put("/:id", controller.validateCourse);

router.delete("/:id", controller.deleteOne);

module.exports = router;
