const express = require("express");
const {RegisterUser,loginUser} = require("../controllers/AuthController");

const Router = express.Router();

Router.route("/register").post(RegisterUser);
Router.route('/login').post(loginUser);

module.exports = Router;
