const categoryModel = require("../models/category.model")

async function createCategory(req, res) {

    try {

        const category = await categoryModel.create({
            name: req.body.name,
            description: req.body.description
        })

        res.status(201).json({
            success: true,
            category
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

async function getAllCategories(req, res) {

    try {

        const categories = await categoryModel.find()

        res.status(200).json({
            success: true,
            count: categories.length,
            categories
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

async function getSingleCategory(req, res) {

    try {

        const category = await categoryModel.findById(
            req.params.id
        )

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }

        res.status(200).json({
            success: true,
            category
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

async function updateCategory(req, res) {

    try {

        const category = await categoryModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }

        res.status(200).json({
            success: true,
            category
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

async function deleteCategory(req, res) {

    try {

        const category = await categoryModel.findByIdAndDelete(
            req.params.id
        )

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Category deleted successfully"
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    createCategory,
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory
}