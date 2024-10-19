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
  if (!fileBuffer) {
    return null;
  }
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

  let fileUrl;
  if (req.file) {
    const fileBuffer = req.file.buffer;
    fileUrl = await uploadFile(fileBuffer);
  }

  const itemData = {
    name: name,
    quantity: quantity,
    image_data: fileUrl,
    category_id: new_category_id,
  };

  await db.createItem(itemData);

  res.redirect(`/`);
}

async function updateGet(req, res) {
  const { id } = req.params;
  const categories = await db.getAllCategories();
  const item = await db.getItem(id);

  res.render("update-item", {
    title: "Update Item",
    categories: categories,
    item: item,
  });
}

async function updatePostRedirect(req, res) {
  let fileUrl;

  if (req.file) {
    const fileBuffer = req.file.buffer;
    fileUrl = await uploadFile(fileBuffer);
  } else {
    fileUrl = req.body.old_image_data;
  }

  const item = { image_data: fileUrl, ...req.body };

  const queryString = `item=${encodeURIComponent(JSON.stringify(item))}`;

  res.redirect(`/item_confirm/update/?${queryString}`);
}

async function updatePost(req, res) {
  const { id } = req.params;
  const { name, quantity, image_data, category_id } = req.body;

  await db.updateItem(id, name, quantity, image_data, category_id);

  res.redirect(`/`);
}

async function deleteGetRedirect(req, res) {
  const { item } = req.query;

  res.redirect(`/item_confirm/delete/?item=${item}`);
}

async function deletePost(req, res) {
  const { id } = req.params;

  await db.deleteItem(id);

  res.redirect(`/`);
}

module.exports = {
  createGet,
  createPost,
  updateGet,
  updatePostRedirect,
  updatePost,
  deletePost,
  deleteGetRedirect,
};
