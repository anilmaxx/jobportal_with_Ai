const express = require('express')
const authController = require("../controllers/auth.controller")
const authRouter = express.Router()

/**
 * @route POST /api/auth/register
 */

authRouter.post("/register", authController.registerUserController)

/**
 * @route POST /api/auth/login
 */

authRouter.post("/login", authController.logInUserController)

/**
 * @route POST /api/auth/logout
 */

authRouter.get("/logout", authController.logoutUserController)
module.exports = authRouter