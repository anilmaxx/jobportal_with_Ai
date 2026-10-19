const express = require('express')
const authController = require("../controllers/auth.controller")
const authRouter = express.Router()

/**
 * @route POST /api/auth/register
 */

authRouter.post("/register", authController.registerUserController)

/**
 * @route GET /api/auth/login
 */

authRouter.post("/login", authController.logInUserController)

module.exports = authRouter