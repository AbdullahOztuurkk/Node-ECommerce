const express = require("express");
const {
  GetCategory,
  GetCategories,
  CreateCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/CategoryController");
const {protect} = require('../middleware/auth');

const Router = express.Router();

Router.route("/").get(GetCategories).post(protect,CreateCategory);

Router.route("/:id")
  .get(GetCategory)
  .put(protect,updateCategory)
  .delete(protect,deleteCategory);

module.exports = Router;
