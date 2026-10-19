const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")
const cookieParser = require("cookie-parser")
async function authUser(req, res, next){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message: "Token not Provided"
        })
    }

    const isBlacklisted = await tokenBlacklistModel.findOne({token})

    if(isBlacklisted){
        return res.status(401).json({
            message: "token is invalid"
        })
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch(err){
        return res.status(401).json({
            message: "invalid token"
        })
    }


}

module.exports = {authUser}