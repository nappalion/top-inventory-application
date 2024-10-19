const db = require("../db/queries");
const crypto = require("crypto");
const firebaseStorage = require("../firebaseStorage");
const { body, validationResult } = require("express-validator");

const lengthErr = "must be between 1 and 30 characters.";
const intErr = "must be a valid integer.";
const imageErr = "must be a valid file (jpg, jpeg, png, gif).";

const validateItem = [
  body("name")
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage(`Name ${lengthErr}`),
  body("quantity").trim().isInt().withMessage(`Quantity ${intErr}`),
  body("image_data")
    .optional()
    .trim()
    .matches(/\.(jpg|jpeg|png|gif)$/i)
    .withMessage(`Photo ${imageErr}`),
  body("category_id")
    .optional()
    .trim()
    .isInt()
    .withMessage(`Category ID ${intErr}`),
];

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

async function createGet(req, res) {
  const categories = await db.getAllCategories();

  res.render("create-item", {
    title: "Create New Item",
    categories: categories,
  });
}

const createPost = [
  validateItem,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const categories = await db.getAllCategories();
      return res.status(400).render("create-item", {
        title: "Create New Item",
        errors: errors.array(),
        categories: categories,
      });
    }

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
  },
];

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

const updatePostRedirect = [
  validateItem,
  async (req, res) => {
    const errors = validationResult(req);

    const item = { image_data: req.body.old_image_data, ...req.body };

    if (!errors.isEmpty()) {
      const categories = await db.getAllCategories();
      return res.status(400).render("update-item", {
        title: "Update Item",
        errors: errors.array(),
        categories: categories,
        item: item,
      });
    }

    if (req.file) {
      const fileBuffer = req.file.buffer;
      item["image_data"] = await uploadFile(fileBuffer);
    }

    const queryString = `item=${encodeURIComponent(JSON.stringify(item))}`;

    res.redirect(`/item_confirm/update/?${queryString}`);
  },
];

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
