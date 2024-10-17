const express = require("express");
const router = express.Router();

const itemController = require("../controllers/itemController");

router.get("/create", itemController.createGet);

router.post("/create", itemController.createPost);

router.get("/update/:id", itemController.updateGet);

router.post("/update/:id", itemController.updatePost);

router.post("/delete/:id", itemController.deletePost);

module.exports = router;
