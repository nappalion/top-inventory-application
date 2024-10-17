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
  const { id } = req.params;
  const { name } = req.body;

  res.redirect(`/category_confirm/update/${id}/${name}`);
}

async function updatePost(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  await db.updateCategory(id, name);

  res.redirect(`/`);
}

async function deleteGetRedirect(req, res) {
  const { id, name } = req.params;

  res.redirect(`/category_confirm/delete/${id}/${name}`);
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
