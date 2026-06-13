const express = require("express")
const route = express.Router()
const {registerUser, loginUser} = require("../controllers/auth.controller")
const authmiddlewares = require("../middlewares/auth.middleware")

route.post("/register",  registerUser)
route.post("/login", authmiddlewares.authUser, loginUser)

module.exports = route;