#! /usr/bin/env node
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});
const { Client } = require("pg");

const SQL = `

CREATE TABLE IF NOT EXISTS categories (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  quantity INT NOT NULL DEFAULT 0,
  image_data VARCHAR(255),
  category_id INT,
  CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories(id)
);

INSERT INTO categories (name)
VALUES 
('Category 1'),
('Category 2'),
('Category 3'),
('Category 4');

INSERT INTO items (name, quantity, category_id)
VALUES 
('bob', 31, 1),
('tom', 14, 2),
('carl', 24, 2),
('jerry', 68, 3);

INSERT INTO items (name, quantity)
VALUES 
('billy', 1);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    // ssl: { rejectUnauthorized: false },
    // connectionString: process.env.CONNECTION_STRING,
    ssl: false,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
