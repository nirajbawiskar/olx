const { getPublicProducts, getPublicProductDetails } = require("../controller/public.Controller")

const router = require("express").Router()
router
    .get("/products", getPublicProducts)
    .get("/product-details/:productId", getPublicProductDetails)
module.exports = router