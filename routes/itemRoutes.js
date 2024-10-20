const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const itemController = require("../controllers/itemController");

router.get("/create", itemController.createGet);

router.post("/create", upload.single("image_data"), itemController.createPost);

router.get("/update/:id", itemController.updateGet);

router.post(
  "/update/redirect",
  upload.single("image_data"),
  itemController.updatePostRedirect
);

router.post("/update/:id", itemController.updatePost);

router.get("/delete/redirect", itemController.deleteGetRedirect);

router.post("/delete/:id", itemController.deletePost);

module.exports = router;
