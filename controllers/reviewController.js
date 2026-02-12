import Review from '../models/Review.js';
import Order from '../models/Order.js';

// @desc    Submit a review
// @route   POST /api/reviews
// @access  Private
export const submitReview = async (req, res) => {
    try {
        const { orderId, rating, comment } = req.body;

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if user owns the order
        if (order.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        // Check if order is delivered
        if (!order.isDelivered || order.status !== 'Delivered') {
            return res.status(400).json({ message: 'Order must be delivered before reviewing' });
        }

        // Check if already reviewed
        if (order.isReviewed) {
            return res.status(400).json({ message: 'Order already reviewed' });
        }

        const review = await Review.create({
            user: req.user._id,
            order: orderId,
            rating,
            comment
        });

        if (review) {
            order.isReviewed = true;
            await order.save();
            res.status(201).json(review);
        } else {
            res.status(400).json({ message: 'Invalid review data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getFeaturedReviews = async (req, res) => {
    try {
        // Fetch 3 highest rated reviews that are marked as featured or simply the latest
        const reviews = await Review.find()
            .populate('user', 'name')
            .sort({ rating: -1, createdAt: -1 })
            .limit(3);

        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate('user', 'name')
            .sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get reviews for a specific product (by finding orders containing the product)
// @route   GET /api/reviews/product/:productId
// @access  Public
export const getProductReviews = async (req, res) => {
    try {
        const { productId } = req.params;
        console.log(`[DEBUG] Fetching reviews for product: ${productId}`);

        // 1. Find all delivered orders that contain this product
        // Relaxing constraints for debugging: removed isDelivered check temporarily
        const orders = await Order.find({
            'orderItems.product': productId,
            isReviewed: true
        }).select('_id');

        console.log(`[DEBUG] Found ${orders.length} reviewed orders for this product.`);

        if (orders.length === 0) {
            console.log('[DEBUG] No orders found matching criteria.');
            return res.json([]);
        }

        const orderIds = orders.map(order => order._id);
        console.log(`[DEBUG] Order IDs: ${orderIds}`);

        // 2. Find reviews for these orders
        const reviews = await Review.find({
            order: { $in: orderIds }
        })
            .populate('user', 'name')
            .sort({ createdAt: -1 });

        console.log(`[DEBUG] Found ${reviews.length} reviews.`);
        res.json(reviews);
    } catch (error) {
        console.error('[DEBUG] Error fetching reviews:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Check for pending reviews for the logged-in user
// @route   GET /api/reviews/pending
// @access  Private
export const checkPendingReviews = async (req, res) => {
    try {
        const pendingOrder = await Order.findOne({
            user: req.user._id,
            status: 'Delivered',
            isReviewed: false
        }).sort({ deliveredAt: -1 });

        res.json(pendingOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
