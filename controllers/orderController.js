import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { sendOrderConfirmationEmail, sendOrderDeliveredEmail } from '../utils/emailService.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = async (req, res) => {
    try {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            discountPrice,
            totalPrice,
            couponCode,
            paymentResult
        } = req.body;

        if (orderItems && orderItems.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }

        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            discountPrice,
            totalPrice,
            couponCode,
            paymentResult
        });

        const createdOrder = await order.save();

        // Update product quantities
        for (const item of orderItems) {
            await Product.findByIdAndUpdate(item.product, {
                $inc: { quantity: -item.qty }
            });
        }

        // Send email notification
        try {
            await sendOrderConfirmationEmail(createdOrder, req.user);
        } catch (emailError) {
            console.error('Failed to send order email:', emailError);
        }

        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');

        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id name').sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            console.log(`Updating order ${req.params.id} status from ${order.status} to ${req.body.status}`);
            order.status = req.body.status || order.status;

            if (req.body.status === 'Delivered') {
                console.log('Entering Delivered status logic...');
                order.isDelivered = true;
                order.deliveredAt = Date.now();

                // Fetch user to send email
                try {
                    const populatedOrder = await Order.findById(order._id).populate('user', 'name email');
                    if (populatedOrder && populatedOrder.user) {
                        console.log(`Sending delivery email to ${populatedOrder.user.email}`);
                        await sendOrderDeliveredEmail(populatedOrder, populatedOrder.user);
                    } else {
                        console.warn('User not found for delivery email');
                    }
                } catch (emailErr) {
                    console.error('Failed to send delivery email:', emailErr);
                }
            }

            const updatedOrder = await order.save();
            console.log('Order updated successfully');
            res.json(updatedOrder);
        } else {
            console.warn(`Order ${req.params.id} not found`);
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private/Admin
export const updateOrderToPaid = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                ...order.paymentResult,
                status: 'Verified',
                update_time: Date.now()
            };

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
