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

  res.redirect(`/${id}/${name}`);
}

async function updatePost(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  await db.updateCategory(id, name);

  res.redirect(`/`);
}

async function deletePost(req, res) {}

module.exports = {
  createGet,
  createPost,
  updateGet,
  updatePostRedirect,
  updatePost,
  deletePost,
};
