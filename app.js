require("dotenv").config();
const path = require("node:path");
const express = require("express");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "/public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

const homeRoutes = require("./routes/homeRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const itemRoutes = require("./routes/itemRoutes");

app.use("/", homeRoutes);
app.use("/category", categoryRoutes);
app.use("/item", itemRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
