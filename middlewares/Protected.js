const { json } = require("express")
const jwt = require("jsonwebtoken")
const User = require("../model/User")
const asyncHandler = require("express-async-handler")
exports.adminProtected = asyncHandler(async (req, res, next) => {
    const token = req.cookies["olx-admin"]
    if (!token) {
        return res.status(401).json({ message: "no cookie found" })
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
            console.log(err)
            return res.status(401).json({ message: "invalid token" })
        }
        req.user = decode._id
        next()
    })
})
exports.userProtected = asyncHandler(async (req, res, next) => {
    const token = req.cookies["olx-user"]
    if (!token) {
        return res.status(401).json({ message: "no cookie found" })
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
            console.log(err)
            return res.status(401).json({ message: "invalid token" })
        }
        req.loggedInUser = decode._id
        next()
    })
})