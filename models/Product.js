const mongoose = require("mongoose");
const { default: slugify } = require("slugify");

const ProductSchema = new mongoose.Schema(
	{
		Category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "products",
		},
		Slug: {
			type: String,
		},
		ProductName: {
			type: String,
			trim: true,
			required: [true, "Please add a name for the Product"],
			maxlength: 30,
		},
		UnitsInStock: {
			type: Number,
			required: true,
		},
		UnitPrice: {
			type: Number,
			required: true,
		},
		Description: {
			type: String,
			trim: true,
			required: [true, "Please add a description for the Product"],
			maxlength: 500,
		},
	},
	{
		versionKey: false,
	}
);

ProductSchema.pre("save", function (next) {
	this.Slug = slugify(this.ProductName, { lower: true });
	next();
});

module.exports = mongoose.model("Product", ProductSchema);
