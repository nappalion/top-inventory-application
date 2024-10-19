const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");

router.get("/get", categoryController.createGet);

router.get("/create", categoryController.createGet);

router.post("/create", categoryController.createPost);

router.get("/update/:id", categoryController.updateGet);

router.post("/update/redirect/", categoryController.updatePostRedirect);

router.post("/update/:id", categoryController.updatePost);

router.post("/delete/:id", categoryController.deletePost);

router.get("/delete/redirect/", categoryController.deleteGetRedirect);

module.exports = router;
