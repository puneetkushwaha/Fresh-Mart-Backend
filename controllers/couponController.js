import asyncHandler from 'express-async-handler';
import Coupon from '../models/Coupon.js';

// @desc    Create a new coupon
// @route   POST /api/coupons
// @access  Private/Admin
export const createCoupon = asyncHandler(async (req, res) => {
    const { code, discountType, discountValue, maxDiscount, minOrderAmount, expirationDate, usageLimit } = req.body;

    const couponExists = await Coupon.findOne({ code });

    if (couponExists) {
        res.status(400);
        throw new Error('Coupon code already exists');
    }

    const coupon = await Coupon.create({
        code,
        discountType,
        discountValue,
        maxDiscount,
        minOrderAmount,
        expirationDate,
        usageLimit
    });

    if (coupon) {
        res.status(201).json(coupon);
    } else {
        res.status(400);
        throw new Error('Invalid coupon data');
    }
});

// @desc    Get all coupons
// @route   GET /api/coupons
// @access  Private/Admin
export const getCoupons = asyncHandler(async (req, res) => {
    const coupons = await Coupon.find({});
    res.json(coupons);
});

// @desc    Validate coupon
// @route   POST /api/coupons/validate
// @access  Private
export const validateCoupon = asyncHandler(async (req, res) => {
    const { code, orderTotal } = req.body;

    const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });

    if (!coupon) {
        res.status(404);
        throw new Error('Invalid or expired coupon');
    }

    if (new Date() > coupon.expirationDate) {
        res.status(400);
        throw new Error('Coupon has expired');
    }

    if (orderTotal < coupon.minOrderAmount) {
        res.status(400);
        throw new Error(`Minimum order amount of ₹${coupon.minOrderAmount} required`);
    }

    let discount = 0;
    if (coupon.discountType === 'PERCENTAGE') {
        discount = (orderTotal * coupon.discountValue) / 100;
        if (coupon.maxDiscount > 0) {
            discount = Math.min(discount, coupon.maxDiscount);
        }
    } else {
        discount = coupon.discountValue;
    }

    res.json({
        valid: true,
        discount: discount,
        code: coupon.code,
        type: coupon.discountType,
        value: coupon.discountValue
    });
});

// @desc    Delete coupon
// @route   DELETE /api/coupons/:id
// @access  Private/Admin
export const deleteCoupon = asyncHandler(async (req, res) => {
    const coupon = await Coupon.findById(req.params.id);

    if (coupon) {
        await coupon.deleteOne();
        res.json({ message: 'Coupon removed' });
    } else {
        res.status(404);
        throw new Error('Coupon not found');
    }
});
// @desc    Get all active coupons (Public)
// @route   GET /api/coupons/public
// @access  Public
export const getPublicCoupons = asyncHandler(async (req, res) => {
    const coupons = await Coupon.find({
        isActive: true
    }).select('code discountType discountValue maxDiscount minOrderAmount expirationDate');
    res.json(coupons);
});
