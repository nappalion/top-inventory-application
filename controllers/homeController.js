const db = require("../db/queries");

async function getCategoriesItems(req, res) {
  res.render("index", {
    title: "Home",
  });
}

module.exports = {
  getCategoriesItems,
};
