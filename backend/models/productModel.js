const mongoose = require("mongoose")

const productschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter product name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "please enter product name"]
    },
    price: {
        type: Number,
        required: [true, "please enter product name"],
        maxLength: [8, "prise cannot exced 8 charaters"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true
    },
    images: [
        {

            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },

        },
    ],
    category: {
        type: String,
        required: [true, "please enter product category"]
    },
    stock: {
        type: Number,
        required: [true, "please enter product stock"],
        maxLength: [4, "stock cannot exced 4 charaters"],
        default: 1
    },
    NumberofReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "user",
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
        }
    ],

    createdAt: {
        type: Date,
        default: Date.now,
    }


})

module.exports = mongoose.model("Product", productschema)