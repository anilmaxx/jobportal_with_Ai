const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")

async function registerUserController(req, res){
    const {username, email, password} = req.body

    if(!username || !email || !password){
        return res.status(400).json({
            message: "Please provide username, email and password"
        })
    }

    const isUserAlreadyExist = await userModel.findOne({
        $or: [ {username}, {email} ]
    })

    if(isUserAlreadyExist){
        return res.status(400).json({
            message: "Account Already existed with username or email"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new userModel({
        username,
        email,
        password: hashedPassword
    })

    const token = jwt.sign({id: newUser._id, username: newUser.username}, process.env.JWT_SECRET, {expiresIn: "1d"})

    await newUser.save()
    res.cookie("token", token)

    return res.status(201).json({
        message: "User registered successfully",
        user:{
            id: newUser._id,
            username: newUser.username,
            email: newUser.email
        }
    })
}

async function logInUserController(req, res){
    const { email, password} = req.body

    if(!email || !password){
        return res.status(400).json({
            message: "Please provide  email and password"
        })
    }

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(400).json({
            message: "invalid  email or password"
        })
    }

    const isPasswordVaild = await bcrypt.compare(password, user.password)

    if(!isPasswordVaild){
        return res.status(400).json({
            message: "invaild  email or password"
        })
    }

    const token = jwt.sign({id: user._id, username: user.username}, process.env.JWT_SECRET, {expiresIn: "1d"})

    res.cookie("token", token)

    return res.status(200).json({
        message: "User Login successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

async function logoutUserController(req, res){
    const token = req.cookies.token

    if(token){
        await tokenBlacklistModel.create({token})
    }

    res.clearCookie("token")

    res.status(200).json({
        message: "User loogrd out succesfully"
    })
}

async function getMeController(req, res){
    const user = await userModel.findById(req.user.id)

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    return res.status(200).json({
        message: "user data fecth successfully...",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

module.exports = {registerUserController, logInUserController, logoutUserController, getMeController}