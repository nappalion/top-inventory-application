const db = require("../db/queries");
const { links } = require("../data/links");

async function getCategoriesItems(req, res) {
  const { category_action, item_action } = req.params;

  const query = req.query;

  let query_item;
  if (query.item) {
    query_item = JSON.parse(query.item);
  }

  let query_category;
  if (query.category) {
    query_category = JSON.parse(query.category);
  }

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

    const item = {
      id: item_id,
      name: item_name,
      quantity: item_quantity,
      image_data: item_image_data,
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

    if (item.id) {
      items[category_id].push(item);
    }
  }

  console.log(items);

  res.render("index", {
    title: "Home",
    links: links,
    categories: categories,
    items: items,
    noCategoryItems: noCategoryItems,
    category: query_category,
    category_action: category_action,
    item: query_item,
    item_action: item_action,
  });
}

module.exports = {
  getCategoriesItems,
};
