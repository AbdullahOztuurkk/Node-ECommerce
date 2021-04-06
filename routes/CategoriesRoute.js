const express = require("express");
const {
  GetCategory,
  GetCategories,
  CreateCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/CategoryController");

const Router = express.Router();

Router.route("/").get(GetCategories).post(CreateCategory);

Router.route("/:id")
  .get(GetCategory)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = Router;
