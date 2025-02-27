const express = require("express")
const mongoose = require('mongoose')
require("dotenv").config()
const cors = require('cors')
const cookieParser = require("cookie-parser")
const { adminProtected, userProtected } = require("./middlewares/Protected")

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: true,
    credentials: true
}))
app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/admin", adminProtected, require("./routes/admin.route"))
app.use("/api/user", userProtected, require("./routes/user.routes"))
app.use("/api/public", require("./routes/public.route"))
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: "server error" })
})

mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open", () => {
    console.log("db connected")
    app.listen(process.env.PORT, console.log("server ruuning"))

})
