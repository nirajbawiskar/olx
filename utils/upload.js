const multer = require('multer')
const productStorage = multer.diskStorage({
    filename: (req, file, cb) => { cb(null, file.originalname) }
})
exports.upload = multer({ storage: productStorage }).array("productImg", 5)