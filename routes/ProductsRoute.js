const express = require("express");
const {
	GetProducts,
	CreateProduct,
	GetProduct,
	updateProduct,
	deleteProduct,
} = require("../controllers/ProductController");
const { protect } = require("../middleware/auth");

const Router = express.Router();

Router.route("/").get(GetProducts).post(protect,CreateProduct);

Router.route("/:id").get(GetProduct).put(protect,updateProduct).delete(protect,deleteProduct);

module.exports = Router;
