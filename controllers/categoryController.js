const db = require("../db/queries");

async function createGet(req, res) {
  res.render("create-category", {
    title: "Create New Category",
  });
}

async function createPost(req, res) {}

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
