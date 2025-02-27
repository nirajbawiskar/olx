const asyncHandler = require("express-async-handler")
const cloud = require("./../utils/cloudinary")
// Product crud
const { upload } = require("../utils/upload")
const path = require("path")
const Product = require("../model/Product")
const User = require("../model/User")
const { checkEmpty } = require("../utils/checkEmpty")
const Order = require("../model/Order")



exports.addProduct = async (req, res) => {
    upload(req, res, async err => {
        if (err) {
            // console.log(err)
            return res.status(400).json({ message: "unable to upload", err })
        }

        if (req.files) {
            const allImages = []
            const heros = []
            for (const item of req.files) {    //loop mein kabhi bhi promises ka code nhi likhte isliye allImages ka empty array ka variable banaya
                allImages.push(cloud.uploader.upload(item.path))
            }
            const data = await Promise.all(allImages)
            for (const item of data) {
                heros.push(item.secure_url)
            }
            //promise all end

            const result = await Product.create({ ...req.body, productImg: heros, seller: req.loggedInUser })
            res.json({ meassage: "add Product success" })
        } else {
            res.status(400).json({ message: "Product img is required", result })
        }

    })
}

exports.getProduct = async (req, res) => {
    const result = await Product.find({ seller: req.loggedInUser })
    res.json({ meassage: "get Product success", result })

}

exports.updateProduct = async (req, res) => {
    upload(req, res, async err => {
        try {
            const allImages = []
            if (req.files && req.files.length > 0) {
                // upload new image
                for (const item of req.files) {
                    const { secure_url } = await cloud.uploader.upload(item.path)
                    allImages.push(secure_url)
                }
            }
            const oldProduct = await Product.findById(req.params._id)
            if (req.body.remove) {
                // remove image
                const result = oldProduct.productImg.filter(item => !req.body.remove.includes(item))
                oldProduct.productImg = result
                if (typeof req.body.remove === 'string') {  //req.body.remove mein string aaya to ye code run hoga (single image to remove)
                    await cloud.uploader.destroy(path.basename(req.body.remove, path.extname(req.body.remove)))
                } else { //req.body.remove mein array aya to ye code run hoga (multiple image to remove)
                    for (const item of req.body.remove) {
                        await cloud.uploader.destroy(path.basename(item, path.extname(item)))
                    }
                }
            }
            // change only data
            await Product.findByIdAndUpdate(req.params._id, { ...req.body, productImg: [...oldProduct.productImg, ...allImages] })
            res.json({ meassage: "update Product success" })
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "something went wrong" })
        }
    })

}

exports.deleteProduct = async (req, res) => {
    const result = await Product.findById(req.params._id)
    //  delete from cloudianry
    for (const item of result.productImg) {
        await cloud.uploader.destroy(path.basename(item, path.extname(item)))  //path.extname(item) ==> removes extension of the item
    }
    //  delete from database
    await Product.findByIdAndDelete(req.params._id)
    res.json({ meassage: "delete Product success" })
}


exports.placeOrder = async (req, res) => {
    try {
        const orderData = await Order.create({
            user: req.loggedInUser,
            products: req.body.products,
        })
        const product_id = req.body.products;
        await Product.findByIdAndUpdate(
            product_id,  // Find product by its ID
            { isSoldProduct: true }  // Set 'isSold' to true
        );
        res.json({ message: "order placed success", orderData })

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "unable to place order" })
    }
}


exports.getUserOrder = async (req, res) => {
    try {
        // console.log(req.loggedInUser);
        const result = await Order
            .find({ user: req.loggedInUser })
            .populate("user", "_id name email city address payment")
            .populate("products", "-quantity -__v")
        res.json({ message: "order fetch success", result })

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "unable to fetch order" })
    }

}

exports.getProduct_LoggedInUser = async (req, res) => {
    const result = await Product.find({ seller: req.loggedInUser, isSoldProduct: false })
    res.json({ message: "get own product success", result })
}
exports.fetchSoldProducts = async (req, res) => {
    try {
        const result = await Product.find({ seller: req.loggedInUser, isSoldProduct: true })
        // .findById(req.params.productId)
        // .populate("user", "_id name email address city payment")
        // .populate("products", "-quantity -__v")
        res.json({ message: "Sold product fetch success", result })

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "unable to fetch order" })
    }
}