import asyncHandler from 'express-async-handler';
import Settings from '../models/Settings.js';

// @desc    Get store settings
// @route   GET /api/settings
// @access  Public
export const getSettings = asyncHandler(async (req, res) => {
    const settings = await Settings.getSettings();
    res.json(settings);
});

// @desc    Update store settings
// @route   PUT /api/settings
// @access  Private/Admin
export const updateSettings = asyncHandler(async (req, res) => {
    const { taxRate, deliveryCharge, deliveryThreshold, pricePerKm, minOrderForFreeDelivery, storeLocation } = req.body;

    const settings = await Settings.findOne();

    if (settings) {
        settings.taxRate = taxRate ?? settings.taxRate;
        settings.deliveryCharge = deliveryCharge ?? settings.deliveryCharge;
        settings.deliveryThreshold = deliveryThreshold ?? settings.deliveryThreshold;
        settings.pricePerKm = pricePerKm ?? settings.pricePerKm;
        settings.minOrderForFreeDelivery = minOrderForFreeDelivery ?? settings.minOrderForFreeDelivery;
        if (storeLocation) settings.storeLocation = storeLocation;

        const updatedSettings = await settings.save();
        res.json(updatedSettings);
    } else {
        // If not found (shouldn't happen due to getSettings, but for safety), create it
        const newSettings = await Settings.create({
            taxRate, deliveryCharge, deliveryThreshold, pricePerKm, minOrderForFreeDelivery, storeLocation
        });
        res.json(newSettings);
    }
});
