const express = require('express')
const cookieParser = require("cookie-parser")
const app = express()
const cors = require("cors")

app.use(express.json())
app.use(cookieParser())

const frontendOrigin = process.env.FRONTEND_URL || "http://localhost:5173"

app.use((req, res, next) => {
    const origin = req.get("origin")

    if (origin === frontendOrigin) {
        res.setHeader("Access-Control-Allow-Origin", frontendOrigin)
        res.setHeader("Access-Control-Allow-Credentials", "true")
        res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS")
        res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization")
        res.setHeader("Vary", "Origin")
    }

    if (req.method === "OPTIONS") {
        return res.sendStatus(204)
    }

    next()
})

/* require all the routes here */
const authRouter = require("./routes/auth.routes")

/* routes */
app.use("/api/auth", authRouter)


module.exports = app