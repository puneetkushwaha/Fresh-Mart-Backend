import express from 'express';
import { submitReview, getFeaturedReviews, checkPendingReviews, getProductReviews, getAllReviews } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const reviewRoutes = express.Router();
console.log('Review router initialized');

reviewRoutes.post('/', protect, submitReview);
reviewRoutes.get('/', getAllReviews);
reviewRoutes.get('/featured', getFeaturedReviews);
reviewRoutes.get('/product/:productId', getProductReviews);
reviewRoutes.get('/pending', protect, checkPendingReviews);

export default reviewRoutes;
