const db = require("../db/queries");

async function createGet(req, res) {
  res.render("create-category", {
    title: "Create New Category",
  });
}

async function createPost(req, res) {
  const { name } = req.body;

  await db.createCategory(name);

  res.redirect("/");
}

async function updateGet(req, res) {
  res.render("update-category", {
    title: "Update Category",
  });
}

async function updatePost(req, res) {}

async function deletePost(req, res) {}

module.exports = {
  createGet,
  createPost,
  updateGet,
  updatePost,
  deletePost,
};
