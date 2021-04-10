const express = require("express");
const {
	GetCategory,
	GetCategories,
	CreateCategory,
	updateCategory,
	deleteCategory,
} = require("../controllers/CategoryController");
const { protect, authorize } = require("../middleware/auth");

const Router = express.Router();

Router.route("/")
	.get(GetCategories)
	.post(protect, authorize("publisher", "admin"), CreateCategory);

Router.route("/:id")
	.get(GetCategory)
	.put(protect, authorize("publisher", "admin"), updateCategory)
	.delete(protect, authorize("publisher", "admin"), deleteCategory);

module.exports = Router;
