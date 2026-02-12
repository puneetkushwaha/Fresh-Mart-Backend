import express from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

console.log('Settings Route Loaded');

router.route('/')
    .get(getSettings)
    .put(protect, admin, updateSettings);

export default router;
