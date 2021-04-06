const express = require("express");
const {
  GetProducts,
  CreateProduct,
  GetProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/ProductController");

const Router = express.Router();

Router.route("/").get(GetProducts).post(CreateProduct);

Router.route("/:id").get(GetProduct).put(updateProduct).delete(deleteProduct);

module.exports = Router;
