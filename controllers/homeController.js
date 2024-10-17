const db = require("../db/queries");
const { links } = require("../data/links");

async function getCategoriesItems(req, res) {
  res.render("index", {
    title: "Home",
    links: links,
  });
}

module.exports = {
  getCategoriesItems,
};
