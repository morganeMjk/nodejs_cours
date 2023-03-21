const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const { authenticateUser } = require("../middlewares/authentication.middleware");

router.post("/create", authenticateUser, postController.Create);
router.get("/", postController.GetAll);
router.get("/:id", postController.GetById);
router.patch("/update", authenticateUser, postController.Update);
router.delete("/delete", authenticateUser, postController.Delete);

module.exports = router;