const { getAdminProduct, AdminAllUsers, adminBlockUnblockUser, getAdminOrders } = require("../controller/admin.controller")


const router = require("express").Router()
router
    .get("/allUsers-admin", AdminAllUsers)
    .get("/getOrders-admin", getAdminOrders)
    .get("/getProduct-admin", getAdminProduct)
    .put("/blockAdmin-admin/:uid", adminBlockUnblockUser)

module.exports = router