const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const lengthErr = "must be between 1 and 30 characters.";

const validateCategory = [
  body("name")
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage(`Name ${lengthErr}`),
];

async function createGet(req, res) {
  res.render("create-category", {
    title: "Create New Category",
  });
}

const createPost = [
  validateCategory,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("create-category", {
        title: "Create New Category",
        errors: errors.array(),
      });
    }

    const { name } = req.body;
    await db.createCategory(name);

    res.redirect("/");
  },
];

async function updateGet(req, res) {
  const { id } = req.params;

  const { name } = await db.getCategory(id);

  res.render("update-category", {
    title: "Update Category",
    id: id,
    name: name,
  });
}

const updatePostRedirect = [
  validateCategory,
  (req, res) => {
    const category = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("update-category", {
        title: "Update Category",
        id: category.id,
        name: category.name,
        errors: errors.array(),
      });
    }

    const queryString = `category=${encodeURIComponent(
      JSON.stringify(category)
    )}`;

    res.redirect(`/category_confirm/update/?${queryString}`);
  },
];

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
