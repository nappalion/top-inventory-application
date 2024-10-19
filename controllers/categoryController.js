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
  const { id } = req.params;

  const { name } = await db.getCategory(id);

  res.render("update-category", {
    title: "Update Category",
    id: id,
    name: name,
  });
}

async function updatePostRedirect(req, res) {
  const category = req.body;

  const queryString = `category=${encodeURIComponent(
    JSON.stringify(category)
  )}`;

  res.redirect(`/category_confirm/update/?${queryString}`);
}

async function updatePost(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  await db.updateCategory(id, name);

  res.redirect(`/`);
}

async function deleteGetRedirect(req, res) {
  const category = req.query;

  const queryString = `category=${encodeURIComponent(
    JSON.stringify(category)
  )}`;

  res.redirect(`/category_confirm/delete/?${queryString}`);
}

async function deletePost(req, res) {
  const { id } = req.params;

  await db.deleteCategory(id);

  res.redirect(`/`);
}

module.exports = {
  createGet,
  createPost,
  updateGet,
  updatePostRedirect,
  updatePost,
  deleteGetRedirect,
  deletePost,
};
