const pool = require("./pool");

const checkIdError = (id) => {
  if (!id) {
    throw new Error("The field 'id' is required.");
  }
};

const checkNameError = (name) => {
  if (!name) {
    throw new Error("The field 'name' is required.");
  }
};

const checkQuantityError = (quantity) => {
  if (!quantity) {
    throw new Error("The field 'quantity' is required.");
  }
};

// Item Queries
async function getAllItems() {
  const { rows } = await pool
    .query(
      `SELECT 
      c.name AS category_name,
      c.id AS category_id,
      i.id AS item_id,
      i.name AS item_name,
      i.image_data AS item_image_data
      FROM categories c 
      LEFT JOIN items i ON c.id = i.category_id
      ORDER BY c.name`
    )
    .then((res) => {
      console.log(`Retrieved all items.`);
      return res;
    })
    .catch((err) => {
      throw err;
    });

  return rows;
}

async function getItem(id) {
  checkIdError(id);

  const { rows } = await pool
    .query("SELECT * FROM items WHERE id=$1", [id])
    .then((res) => {
      console.log(`Retrieved item with id: ${id}.`);
      return res;
    })
    .catch((err) => {
      throw err;
    });
  return rows[0];
}

async function createItem({ name, quantity, image_data, category_id }) {
  checkNameError(name);
  checkQuantityError(quantity);

  const pgValues = ["$1", "$2"];
  const fields = ["name", "quantity"];
  const values = [name, quantity];

  if (image_data) {
    fields.push(`image_data`);
    values.push(image_data);
    pgValues.push(`$${values.length}`);
  }
  if (category_id) {
    fields.push(`category_id`);
    values.push(category_id);
    pgValues.push(`$${values.length}`);
  }

  let query = `INSERT INTO items (${fields.join(",")}) VALUES (${pgValues.join(
    ","
  )})`;

  await pool
    .query(query, values)
    .then(() => console.log(`Inserted item: ${values.join(",")}.`))
    .catch((err) => {
      throw err;
    });
}

async function updateItem(id, name, quantity, image_data, category_id) {
  idError(id);
  checkNameError(name);
  checkQuantityError(quantity);

  const fields = ["name=$1", "quantity=$2"];
  const values = [name, quantity];

  if (image_data) {
    values.push(image_data);
    fields.push(`image_data=$${values.length}`);
  }
  if (category_id) {
    values.push(category_id);
    fields.push(`category_id=$${values.length}`);
  }

  values.append(id);
  let query = `UPDATE items SET ${fields.join(",")} WHERE items.id=$${
    values.length
  }`;

  await pool
    .query(query, values)
    .then(() => console.log(`Updated item with: ${values.join(",")}.`))
    .catch((err) => {
      throw err;
    });
}

async function deleteItem(id) {
  checkIdError(id);

  await pool
    .query(`DELETE FROM items WHERE id=$1`, [id])
    .then(() => console.log(`Deleted item with id: ${id}.`))
    .catch((err) => {
      throw err;
    });
}

// Category Queries
async function getAllCategories() {
  const { rows } = await pool
    .query(`SELECT * FROM categories`)
    .then((res) => {
      console.log(`Retrieved all categories.`);
      return res;
    })
    .catch((err) => {
      throw err;
    });

  return rows;
}

async function getCategory(id) {
  checkIdError(id);

  const { rows } = await pool
    .query(`SELECT * FROM categories WHERE categories.id = $1`, [id])
    .then((res) => {
      console.log(`Retrieved all categories.`);
      return res;
    })
    .catch((err) => {
      throw err;
    });

  return rows[0];
}

async function createCategory(name) {
  checkNameError(name);

  await pool
    .query(`INSERT INTO categories (name) VALUES ($1)`, [name])
    .then(() => console.log(`Inserted category: ${name}.`))
    .catch((err) => {
      throw err;
    });
}

async function updateCategory(id, name) {
  checkIdError(id);
  checkNameError(name);

  await pool
    .query(`UPDATE categories SET name=$1 WHERE categories.id=$2`, [name, id])
    .then(() => console.log(`Updated category '${name}'.`))
    .catch((err) => {
      throw err;
    });
}

async function deleteCategory(id) {
  checkIdError(id);

  await pool
    .query(`DELETE FROM categories WHERE id=$1`, [id])
    .then(() => console.log(`Deleted category with id: ${id}.`))
    .catch((err) => {
      throw err;
    });
}

module.exports = {
  getAllItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
