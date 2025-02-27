const asyncHandler = require('express-async-handler')
const Admin = require('../model/Admin')
const bcrypt = require("bcryptjs")
const validator = require('validator')
const jwt = require('jsonwebtoken')
const { differenceInSeconds } = require('date-fns')
const { sendEmail } = require('../utils/email')
const { generateOTP } = require('../utils/otp')
const User = require('../model/User')


exports.registerAdmin = asyncHandler(async (req, res) => {

    const { name, email, mobile } = req.body
    if (validator.isEmpty(name) || validator.isEmpty(email) || validator.isEmpty(mobile)) {
        return res.status(400).json({ message: "all fields required" })
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "invalid email" })
    }
    if (!validator.isMobilePhone(mobile, "en-IN")) {
        return res.status(400).json({ message: "invalid mobile" })
    }
    await Admin.create({ name, email, mobile })
    res.json({ message: "admin register success" })

})
exports.loginAdmin = asyncHandler(async (req, res) => {

    const { userName } = req.body
    const result = await Admin.findOne({ $or: [{ email: userName }, { mobile: userName }] })
    if (!result) {
        return res.status(400).json({ message: "invalid credentials" })
    }
    const otp = generateOTP()
    await Admin.findByIdAndUpdate(result._id, { otp, otpSendOn: Date.now() })
    await sendEmail({
        message: `<h1>your Otp is ${otp}</h1>`,
        subject: "verify otp to login",
        to: result.email
    })
    res.json({ message: "otp send" })

})
exports.verifyAdminOTP = asyncHandler(async (req, res) => {

    const { otp, userName } = req.body
    const result = await Admin.findOne({ $or: [{ email: userName }, { mobile: userName }] })
    if (!result) {
        return res.status(401).json({ message: "invalid credentials" })
    }
    if (result.otp !== otp) {
        return res.status(401).json({ message: "invalid otp" })
    }
    if (differenceInSeconds(Date.now(), result.otpSendOn) > process.env.OTP_EXPIRE) {
        await Admin.findByIdAndUpdate(result._id, { otp: null })
        return res.status(401).json({ message: "otp expire" })

    }
    await Admin.findByIdAndUpdate(result._id, { otp: null })
    const token = jwt.sign({ _id: result._id }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("olx-admin", token, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    })
    res.json({
        message: "login success",
        result: {
            name: result.name,
            email: result.email
        }
    })
    // res.json({ message: "admin verify otp success" })
})
exports.logoutAdmin = asyncHandler((req, res) => {
    res.clearCookie("olx-admin")
    res.json({ message: "admin logout success" })
})

//register user
//login user
//logout user
exports.registerUser = asyncHandler(async (req, res) => {
    const isFound = await User.findOne({ email: req.body.email })//object
    if (isFound) {
        return res.status(401).json({ message: "email already exist,please use another email" })
    }
    const x = await bcrypt.hash(req.body.password, 10)
    await User.create({ ...req.body, password: x })
    res.status(201).json({ message: "register user success" })

})
exports.loginUser = asyncHandler(async (req, res) => {

    const { userName, password } = req.body

    const result = await User.findOne({ $or: [{ email: userName }, { mobile: userName }] })
    if (!result) {
        return res.status(401).json({ message: "invalid credentials email" })
    }
    const isVerify = await bcrypt.compare(password, result.password)
    if (!isVerify) {
        return res.status(401).json({ message: "invalid credentials password" })

    }

    const token = jwt.sign({ _id: result._id }, process.env.jWT_SECRET)
    res.cookie("olx-user", token, {
        maxAge: 10000 * 60 * 60 * 24,
        httpOnly: true,
    })
    res.json({
        message: "olx login success", result: {
            _id: result._id,
            name: result.name,
            email: result.email,
            city: result.city,
            address: result.address,
            infoComplete: result.infoComplete
        }
    })

    // res.json({ message: "user login success" })
})
exports.logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("olx-user")
    res.json({ message: "user logout success" })
})