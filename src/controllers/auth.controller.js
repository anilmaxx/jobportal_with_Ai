const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")

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

    if(!isUserAlreadyExist){
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

module.exports = {registerUserController}