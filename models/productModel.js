import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
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
        type: mongoose.ObjectId,//categoryid from "categories" in mongodb
        ref: 'Category',//refers the category schema model
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    photo: {
        data: Buffer,//gives some buffer data
        contentType: String //"contentType": "image/jpeg"
    },
    shipping: {
        type: Boolean
    }
}, { timestamps: true })

export default mongoose.model('Products', productSchema)