const Product = require("../models/Product");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/async");

const ProductLimitPerPage = 25;

//@desc Get Products
//@route GET api/v1/products
//@access Public
exports.GetProducts = asyncHandler(async (req, res, next) => {
	resultPerPage = parseInt(req.query.page, 10) || 1;
	const products = await Product.find()
		.skip(ProductLimitPerPage * (resultPerPage - 1))
		.limit(ProductLimitPerPage);

	res.status(200).json({
		success: true,
		count: products.length,
		data: products,
	});
});

//@desc Get Product
//@route GET api/v1/products/:id
//@access Public
exports.GetProduct = asyncHandler(async (req, res, next) => {
	const product = await Product.findById(req.params.id);
	if (!product) {
		return next(
			new ErrorResponse(
				`Cannot get Product with Id : ${req.params.id}`,
				400
			)
		);
	}

	res.status(200).json({ success: true, data: product });
});

//@desc Create Product
//@route POST api/v1/products/
//@access Private
exports.CreateProduct = asyncHandler(async (req, res, next) => {
	const product = await Product.create(req.body);

	res.status(201).json({
		success: true,
		data: product,
	});
});

// @desc      Update product
// @route     PUT /api/v1/products/:id
// @access    Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
	const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	if (!product) {
		return next(
			new ErrorResponse(
				`Cannot get Product with Id : ${req.params.id}`,
				400
			)
		);
	}

	res.status(200).json({ success: true, data: product });
});

// @desc      Delete Product
// @route     DELETE /api/v1/products/:id
// @access    Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
	const product = await Product.findByIdAndDelete(req.params.id);

	if (!product) {
		return next(
			new ErrorResponse(
				`Cannot get Product with Id : ${req.params.id}`,
				400
			)
		);
	}

	res.status(200).json({ success: true, data: {} });
});
