const express = require("express");
const {RegisterUser,deleteUser,updateUser } = require("../controllers/AuthController");

const Router = express.Router();

Router.route("/register").post(RegisterUser);

module.exports = Router;
