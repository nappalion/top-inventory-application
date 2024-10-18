const db = require("../db/queries");
const { links } = require("../data/links");

async function getCategoriesItems(req, res) {
  const { category_id, category_name, category_action } = req.params;

  const dbRows = await db.getAllItems();

  const items = {}; // category_id: [] of item
  const categories = {}; // category_id: category_name
  const noCategoryItems = [];

  for (const dbRow of dbRows) {
    const {
      category_name,
      category_id,
      item_id,
      item_name,
      item_quantity,
      item_image_data,
    } = dbRow;

    let converted_img_data;
    if (item_image_data) {
      const base64_img_data = item_image_data.toString("base64");
      converted_img_data = `data:image/jpeg;base64,${base64_img_data}`;
    }

    const item = {
      id: item_id,
      name: item_name,
      quantity: item_quantity,
      image_data: converted_img_data,
      category_id: category_id,
    };

    if (!category_id) {
      noCategoryItems.push(item);
      continue;
    }

    if (!(category_id in categories)) {
      categories[category_id] = category_name;
      items[category_id] = [];
    }

    items[category_id].push(item);
  }

  res.render("index", {
    title: "Home",
    links: links,
    categories: categories,
    items: items,
    noCategoryItems: noCategoryItems,
    category_id: category_id,
    category_name: category_name,
    category_action: category_action,
  });
}

module.exports = {
  getCategoriesItems,
};
