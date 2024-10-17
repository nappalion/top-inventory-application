const db = require("../db/queries");
const { links } = require("../data/links");

async function getCategoriesItems(req, res) {
  const dbRows = await db.getAllItems();

  const items = {};
  const noCategoryItems = [];

  for (const dbRow of dbRows) {
    const { category_name, category_id, item_id, item_name, item_image_data } =
      dbRow;

    const item = {
      id: item_id,
      name: item_name,
      image_data: item_image_data,
      category_id: category_id,
    };

    if (!category_name) {
      noCategoryItems.push(item);
      continue;
    }

    if (!(category_name in dbRows)) {
      items[category_name] = [];
    }

    items[category_name].push(item);
  }

  items["No Category"] = noCategoryItems;

  res.render("index", {
    title: "Home",
    links: links,
    items: items,
  });
}

module.exports = {
  getCategoriesItems,
};
