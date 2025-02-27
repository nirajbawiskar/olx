const { addProduct, getProduct, deleteProduct, updateProduct, placeOrder, getUserOrder, getProduct_LoggedInUser, fetchSoldProducts, } = require("../controller/user.controller")



const router = require("express").Router()
router

    // product CRUD
    .post("/addProduct-user", addProduct)
    .get("/getProduct-user", getProduct)
    .put("/updateProduct-user/:_id", updateProduct)
    .delete("/deleteProduct-user/:_id", deleteProduct)

    // .post("/userUpdate-info", updateUserInfo)
    .post("/place-order", placeOrder)
    // .get("/order-histroy", getUserOrder)

    .get("/user-order-details", getUserOrder)
    .get("/sold-product-details", fetchSoldProducts)
    .get("/user-own-products", getProduct_LoggedInUser)
module.exports = router