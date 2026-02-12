import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
    let token;

    console.log('Protect middleware called');
    if (typeof next !== 'function') {
        console.error('Error: next is not a function in protect middleware!');
    }

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            console.log('Protect middleware successful, calling next');
            return next();
        } catch (error) {
            console.error('Protect middleware error:', error);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        console.log('Protect middleware failed: No token');
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

export const admin = (req, res, next) => {
    console.log('Admin middleware called');
    if (req.user && req.user.role === 'admin') {
        console.log('Admin verification successful, calling next');
        next();
    } else {
        console.log('Admin verification failed:', req.user ? `role is ${req.user.role}` : 'no user');
        res.status(401).json({ message: 'Not authorized as an admin' });
    }
};
