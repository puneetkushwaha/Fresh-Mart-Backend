import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
    taxRate: {
        type: Number,
        default: 5,
        required: true
    },
    deliveryCharge: {
        type: Number,
        default: 20, // Base charge
        required: true
    },
    storeLocation: {
        lat: { type: Number, default: 0 },
        lng: { type: Number, default: 0 },
        address: { type: String, default: '' }
    },
    deliveryThreshold: {
        type: Number,
        default: 5, // Km distance for base charge
        required: true
    },
    pricePerKm: {
        type: Number,
        default: 10, // Charge per km after threshold
        required: true
    },
    minOrderForFreeDelivery: {
        type: Number,
        default: 500
    }
}, {
    timestamps: true
});

// Ensure only one settings document exists
settingsSchema.statics.getSettings = async function () {
    const settings = await this.findOne();
    if (settings) return settings;
    return await this.create({});
};

export default mongoose.model('Settings', settingsSchema);
