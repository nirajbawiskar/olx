const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    address: { type: String },
    city: { type: String },
    payment: { type: String, default: "COD" },
    //                                                 👇prduct.js
    products: { type: mongoose.Types.ObjectId, ref: "product", required: true },
    status: { type: String, enum: ["palced", "delivered", "cancel"], default: "palced" },
}, { timestamps: true })
module.exports = mongoose.model("order", orderSchema)



