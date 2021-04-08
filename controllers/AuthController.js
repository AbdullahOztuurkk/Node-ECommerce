const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");

//@desc Register
//@route POST api/v1/auth/
//@access Private
exports.RegisterUser = asyncHandler(async (req, res, next) => {
	const { name, email, password, role } = req.body;
	//Create User
	const user = await User.create({
		name,
		email,
		password,
		role,
	});
	//Create token
	const token = user.getSignedJwtToken();

	res.status(201).json({
		success: true,
		token: token,
	});
});

// @desc      Login User
// @route     POST /api/v1/auth/login
// @access    Private
exports.loginUser = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	//Validate email and password
	if (!email || !password) {
		next(new ErrorResponse("Please enter the invalid email and password",400));
	}

	//Check the user (We include password because of select:false)
	const currentUser = User.findOne({ email }).select("+password");
	if (!currentUser) {
		next(new ErrorResponse("Invalid credentials", 401));
	}

	//Check if password matches
	const result = await currentUser.matchPassword(password);
	if (!result) next(new ErrorResponse("Invalid credentials", 401));

    //Create token
	const token = currentUser.getSignedJwtToken();
	res.status(201).json({
		success: true,
		token: token,
	});
});
