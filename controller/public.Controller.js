const Product = require("../model/Product")
exports.getPublicProducts = async (req, res) => {
    try {
        const result = await Product.find({
            $and: [
                { seller: { $ne: req.loggedInUser } },
                { isSoldProduct: false },
            ]
        })

        res.json({ message: "Product fetch success", result });
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
};



exports.getPublicProductDetails = async (req, res) => {
    // const pId = req.params.productId
    // if (!pId) {
    //     return res.status(400).json({ message: "id not found" })
    // }
    const result = await Product.findById(req.params.productId).populate("seller")
    res.json({ meassage: "get product detail success", result })

}


