const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken")

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please add a name"],
	},
	email: {
		type: String,
		required: [true, "Please add an email"],
		unique: true,
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			"Please add a valid email",
		],
	},
	role: {
		type: String,
		enum: ["user", "publisher"],
		default: "user",
	},
	password: {
		type: String,
		required: [true, "Please add a password"],
		minlength: 6,
		select: false,
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,
	confirmEmailToken: String,
	isEmailConfirmed: {
		type: Boolean,
		default: false,
	},
	twoFactorCode: String,
	twoFactorCodeExpire: Date,
	twoFactorEnable: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

//Encrypted passwords before save
userSchema.pre('save',async function(next){
  const salt=await bcrypt.genSalt(10);//Generate 10 digit salt
  this.password= await bcrypt.hash(this.password,salt);
});

//Create method called getSignedJwtToken
userSchema.methods.getSignedJwtToken=function(){
  return jwt.sign({ id : this._id},process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRE_TIME})
};

//Create method called matchPassword for check password
userSchema.methods.matchPassword = async function(EnteredPassword){
  return await bcrypt.compare(EnteredPassword,this.password);
};

module.exports = mongoose.model("User", userSchema);
