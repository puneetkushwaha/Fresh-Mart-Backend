import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a category name'],
        unique: true,
        trim: true
    },
    icon: {
        type: String,
        default: 'Package'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Category', categorySchema);
