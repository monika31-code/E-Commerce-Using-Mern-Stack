const express = require("express")
const router = express.Router()

const multer = require("multer")

const storage = multer.memoryStorage()

const upload = multer({
    storage
})

const {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/product.controller")

router.post(
    "/",
    upload.array("images", 5),
    createProduct
)

router.get("/", getAllProducts)

router.get("/:id", getSingleProduct)

router.put("/:id", updateProduct)

router.delete("/:id", deleteProduct)

module.exports = router