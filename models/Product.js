import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a product name'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Please add a category']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    discount: {
        type: Number,
        default: 0
    },
    quantity: {
        type: Number,
        required: [true, 'Please add stock quantity'],
        default: 0
    },
    unit: {
        type: String,
        required: [true, 'Please add a unit (e.g., 1kg, 500g)']
    },
    image: {
        type: String,
        required: [true, 'Please add an image URL']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    rating: {
        type: Number,
        default: 0
    },
    reviews: {
        type: Number,
        default: 0
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Product', productSchema);
