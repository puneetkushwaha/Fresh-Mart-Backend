import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getDashboardStats = async (req, res) => {
    try {
        // Total Revenue
        const orders = await Order.find({ status: { $ne: 'Cancelled' } });
        const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);

        // Active Orders
        const activeOrdersCount = await Order.countDocuments({
            status: { $in: ['Pending', 'Processing', 'Shipped'] }
        });

        // Total Customers
        const totalCustomers = await User.countDocuments({ role: 'customer' });

        // Low Stock Items
        const lowStockItems = await Product.countDocuments({ quantity: { $lt: 10 } });

        // Recent Orders (last 5)
        const recentOrders = await Order.find({})
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('user', 'name');

        // New Customers (last 5)
        const newCustomers = await User.find({ role: 'customer' })
            .sort({ createdAt: -1 })
            .limit(5);

        res.json({
            stats: {
                totalRevenue,
                activeOrders: activeOrdersCount,
                totalCustomers,
                lowStockItems
            },
            recentOrders,
            newCustomers
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
