const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

router.get("/", homeController.getCategoriesItems);
router.get("/:category_id/:category_name", homeController.getCategoriesItems);

module.exports = router;
