const userModel = require("../models/user.model")


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

    
}

module.exports = {registerUserController}