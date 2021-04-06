const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");

//@desc Register
//@route POST api/v1/auth/
//@access Private
exports.RegisterUser= asyncHandler(async (req, res, next) => {

});

// @desc      Update User
// @route     PUT /api/v1/auth/:id
// @access    Private
exports.updateUser = asyncHandler(async (req, res, next) => {
	
});

// @desc      Delete User
// @route     DELETE /api/v1/auth/:id
// @access    Private
exports.deleteUser = asyncHandler(async (req, res, next) => {
	
});
