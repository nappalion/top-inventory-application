const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

router.get("/", homeController.getCategoriesItems);
router.get(
  "/category_confirm/:category_action/:category_id/:category_name",
  homeController.getCategoriesItems
);
router.get("/item_confirm/:item_action/", homeController.getCategoriesItems);

module.exports = router;
