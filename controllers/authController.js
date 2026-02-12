import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// @desc    Register user
// @route   POST /api/auth/signup
// @access  Public
export const signup = async (req, res) => {
    try {
        const { name, email, password, phone, role } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            phone,
            role: role || 'customer'
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for user email
        const user = await User.findOne({ email }).select('+password');

        if (user && (await user.matchPassword(password))) {
            console.log('Login successful for:', email);
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                address: user.address,
                token: generateToken(user._id)
            });
        } else {
            console.log('Login failed for:', email);
            if (!user) console.log('User not found');
            else console.log('Password match failed');
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                address: user.address
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res) => {
    try {
        console.log('updateProfile called with body:', req.body);
        console.log('User ID from token:', req.user?._id);

        const user = await User.findById(req.user._id);

        if (user) {
            console.log('User found in DB');
            user.name = req.body.name || user.name;
            user.phone = req.body.phone || user.phone;

            if (req.body.address) {
                console.log('Updating address fields');
                user.address = {
                    street: req.body.address.street || user.address?.street,
                    city: req.body.address.city || user.address?.city,
                    state: req.body.address.state || user.address?.state,
                    zip: req.body.address.zip || user.address?.zip
                };
            }

            if (req.body.password) {
                console.log('Password change requested');
                user.password = req.body.password;
            }

            console.log('Attempting to save user...');
            const updatedUser = await user.save();
            console.log('User saved successfully');

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                phone: updatedUser.phone,
                address: updatedUser.address,
                token: generateToken(updatedUser._id)
            });
        } else {
            console.log('User not found in DB');
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error in updateProfile:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all users
// @route   GET /api/auth/users
// @access  Private/Admin
export const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Forgot Password
// @route   POST /api/auth/forgotpassword
// @access  Public
export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    let user;

    try {
        user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Get reset token
        const resetToken = user.getResetPasswordToken();
        console.log('Reset token generated:', resetToken);

        await user.save({ validateBeforeSave: false });
        console.log('User saved with reset token');

        // Create reset url
        // For local dev, we'll log it. In prod, send email.
        const resetUrl = `${req.protocol}://localhost:5173/reset-password/${resetToken}`;

        console.log(`Password reset requested for ${email}. Reset URL: ${resetUrl}`);

        res.status(200).json({
            success: true,
            data: 'Email sent (check console for link in dev mode)'
        });

    } catch (error) {
        console.error(error);
        if (user) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({ validateBeforeSave: false });
        }
        res.status(500).json({ message: 'Email could not be sent' });
    }
};

// @desc    Reset Password
// @route   PUT /api/auth/resetpassword/:resettoken
// @access  Public
export const resetPassword = async (req, res) => {
    try {
        // Get hashed token
        const resetPasswordToken = crypto
            .createHash('sha256')
            .update(req.params.resettoken)
            .digest('hex');

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        // Set new password
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({
            success: true,
            token: generateToken(user._id),
            message: 'Password updated successfully'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
