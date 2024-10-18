const db = require("../db/queries");

async function createGet(req, res) {
  const categories = await db.getAllCategories();

  res.render("create-item", {
    title: "Create New Item",
    categories: categories,
  });
}

async function createPost(req, res) {
  const { name, quantity, category_id } = req.body;
  const image_file = req.file;
  const new_category_id = parseInt(category_id);

  const image_buffer = image_file ? image_file.buffer : null;

  const itemData = {
    name: name,
    quantity: quantity,
    image_data: image_buffer,
    category_id: new_category_id,
  };

  await db.createItem(itemData);
}

async function updateGet(req, res) {}

async function updatePost(req, res) {}

async function deletePost(req, res) {}

module.exports = {
  createGet,
  createPost,
  updateGet,
  updatePost,
  deletePost,
};
