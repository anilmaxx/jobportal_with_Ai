const express = require('express')
const authController = require("../controllers/auth.controller")
const authRouter = express.Router()
const authmiddleware =require("../middleware/auth.middleware")
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

/**
 * @route GET api/auth/get-me
 */

authRouter.get("/get-me", authmiddleware.authUser, authController.getMeController)

module.exports = authRouter