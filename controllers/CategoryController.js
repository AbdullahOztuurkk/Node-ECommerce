const Category = require("../models/Category");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/async");

const CategoryLimitPerPage = 10;

//@desc Get Categories
//@route GET api/v1/categories
//@access Public
exports.GetCategories = asyncHandler(async (req, res, next) => {
	//Pagination
	let resultPerPage = parseInt(req.query.page, 10) || 1;
	const categories = await Category.find()
		.skip(CategoryLimitPerPage * (resultPerPage - 1))
		.limit(CategoryLimitPerPage);
	res.status(200).json({
		success: true,
		count: categories.length,
		data: categories,
	});
});

//@desc Get Category
//@route GET api/v1/categories/:id
//@access Public
exports.GetCategory = asyncHandler(async (req, res, next) => {
	const category = await Category.findById(req.params.id);

	if (!category) {
		return next(
			new ErrorResponse(
				"Cannot get Category with id " + req.params.id,
				400
			)
		);
	}

	res.status(200).json({ success: true, data: category });
});

//@desc Create Category
//@route POST api/v1/categories/
//@access Private
exports.CreateCategory = asyncHandler(async (req, res, next) => {
	const category = await Category.create(req.body);

	res.status(201).json({
		success: true,
		data: category,
	});
});

// @desc      Update Category
// @route     PUT /api/v1/categories/:id
// @access    Private
exports.updateCategory = asyncHandler(async (req, res, next) => {
	const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	if (!category) {
		return next(
			new ErrorResponse(
				`Cannot get Category with Id : ${req.params.id}`,
				400
			)
		);
	}

	res.status(200).json({ success: true, data: category });
});

// @desc      Delete Category
// @route     DELETE /api/v1/categories/:id
// @access    Private
exports.deleteCategory = asyncHandler(async (req, res, next) => {
	const category = await Category.findByIdAndDelete(req.params.id);

	if (!category) {
		return next(
			new ErrorResponse(
				`Cannot get Category with Id : ${req.params.id}`,
				400
			)
		);
	}

	res.status(200).json({ success: true, data: {} });
});
