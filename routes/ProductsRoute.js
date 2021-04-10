const express = require("express");
const {
	GetProducts,
	CreateProduct,
	GetProduct,
	updateProduct,
	deleteProduct,
} = require("../controllers/ProductController");
const { protect, authorize } = require("../middleware/auth");

const Router = express.Router();

Router.route("/")
	.get(GetProducts)
	.post(protect, authorize("publisher", "admin"), CreateProduct);

Router.route("/:id")
	.get(GetProduct)
	.put(protect, authorize("publisher", "admin"), updateProduct)
	.delete(protect, authorize("publisher", "admin"), deleteProduct);

module.exports = Router;
