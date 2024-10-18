const db = require("../db/queries");
const crypto = require("crypto");
const firebaseStorage = require("../firebaseStorage");

async function createGet(req, res) {
  const categories = await db.getAllCategories();

  res.render("create-item", {
    title: "Create New Item",
    categories: categories,
  });
}

async function uploadFile(fileBuffer) {
  const bucket = firebaseStorage.bucket();
  const randomFileName = `${crypto.randomUUID()}.jpg`;
  const file = bucket.file(randomFileName);

  await file.save(fileBuffer, {
    metadata: { contentType: "image/jpeg" },
    public: true,
  });

  const fileUrl = `https://storage.googleapis.com/${bucket.name}/${randomFileName}`;
  return fileUrl;
}

async function createPost(req, res) {
  const { name, quantity, category_id } = req.body;
  const new_category_id = parseInt(category_id);

  const fileBuffer = req.file.buffer;
  const fileUrl = await uploadFile(fileBuffer);

  const itemData = {
    name: name,
    quantity: quantity,
    image_data: fileUrl,
    category_id: new_category_id,
  };

  await db.createItem(itemData);

  res.redirect(`/`);
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
