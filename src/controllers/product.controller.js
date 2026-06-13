const mongoose = require("mongoose")
const productModel = require("../models/product.model")
const jwt = require("jsonwebtoken")
const { uploadFiles } = require("../services/storage.service")

async function createProduct(req, res) {

    const imageUrls = []

    for (const file of req.files) {

        const uploaded = await uploadFiles(
            file.buffer,
            file.originalname
        )

        imageUrls.push({
            url: uploaded.url
        })
    }

    const product = await productModel.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        images: imageUrls
    })

    res.status(201).json({
        message: "Product created successfully",
        product,
        image: product.images
    })
}

async function getAllProducts(req, res) {
    try {

        const products = await productModel.find().populate("category", "name")

        res.status(200).json({
            success: true,
            count: products.length,
            products
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}

async function getSingleProduct(req, res) {

    try {
        const products = await productModel.findById(req.params.id)

        if (!products) {
            return res.status(404).json({
                success: false,
                message: "product not found"
            })
        }

        res.status(200).json({
            success: true,
            products
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

async function updateProduct(req, res) {

    try {

        const product = await productModel.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                category: req.body.category,
                stock: req.body.stock
            },
            {
                new: true,
                runValidators: true
            }
        )

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}

async function deleteProduct(req, res) {

    try {

        const product = await productModel.findByIdAndDelete(
            req.params.id
        )

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
}