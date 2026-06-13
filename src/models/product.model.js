const mongoose = require("mongoose")

const product = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },

    images: [{
        url: String
    }]

},
    {
        timestamps: true
    }
)

const productModel = mongoose.model("products", product)

module.exports = productModel;