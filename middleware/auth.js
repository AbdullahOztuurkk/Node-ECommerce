const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");

//Check private routes
exports.protect = asyncHandler(async (req, res, next) => {
	let token;

	//Check request headers for authorization
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];
	}

	//Make sure token exists
	if (!token) {
		next(new ErrorResponse("Not Authorized!", 401));
	}
	//Verify token
	try {
		const decoded = await jwt.verify(token, process.env.JWT_SECRET);
		req.user = await User.findById(decoded.id);

		next();
	} catch (err) {
		next(new ErrorResponse("Not Authorized!", 401));
	}
});

//Grant access by roles to private routes
exports.authorize=(...roles)=>{
	return (req,res,next)=>{
		if(!roles.includes(req.user.role)){
			next(new ErrorResponse(`${req.user.role} is not authorized to this route.`,403));
		}
		next();
	}
};