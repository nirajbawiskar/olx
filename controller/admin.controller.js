const asyncHandler = require('express-async-handler')
const Product = require("../model/Product")
const User = require("../model/User")
const Order = require('../model/Order')

exports.AdminAllUsers = asyncHandler(async (req, res) => {
    const result = await User.find()
        .select("-createdAt -updatedAt -__v -password")
        .sort({ createdAt: -1 })
    return res.json({ message: "All users fetch success", result })
})

exports.getAdminProduct = async (req, res) => {
    const result = await Product.find().populate("seller", "_id name email mobile")
    res.json({ meassage: "get product success", result })

}
exports.getAdminOrders = async (req, res) => {
    // const result = await Product.find().populate("seller", "_id name email mobile")
    const result = await Order.find()
        .populate("user", "_id name email mobile")
        .populate("products", "seller productImg")
        // .populate("products.seller",)
        .populate({
            path: "products",
            populate: {
                path: "seller"
            }
        })
    res.json({ meassage: "get product success", result })
    // res.json({ meassage: "get product success", result })

}
exports.adminBlockUnblockUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.uid, { isActive: req.body.isActive })
        res.json({ message: "Account block success" })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "something went wrong" })
    }
}
