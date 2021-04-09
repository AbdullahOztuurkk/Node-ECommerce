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

	sendTokenResponse(user,200,res);
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
	const user = await User.findOne({ email },'+password');
	if (!user) {
		next(new ErrorResponse("Invalid credentials", 401));
	}

	//Check if password matches
	const result = await user.matchPassword(password);
	if (!result) next(new ErrorResponse("Invalid credentials", 401));

    sendTokenResponse(user,200,res);
});

//Get token from model, create cookie with token and return cookie
const sendTokenResponse = (user,statusCode,res) =>{
	
	//Get token from User
	const token = user.getSignedJwtToken();
	
	//Generate cookie options
	const options={
		expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRE*24*60*60*1000),//Monthly cookie kind of milliseconds
		httpOnly:true
	};

	//Send Response
	res
	.status(statusCode)
	.cookie('token',token,options)
	.json({
		success:true,
		token
	});
};