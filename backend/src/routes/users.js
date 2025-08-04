

const express = require('express');
const { getUserProfile, updateUserProfile, getUserPosts } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Route to get user profile by ID (protected)
router.get('/:id', authMiddleware, getUserProfile);

// Route to update user profile (protected)
router.put('/:id', authMiddleware, updateUserProfile); // Added PUT route for updating profile

// Route to get user posts by user ID (protected - though can be public if desired)
router.get('/:userId/posts', authMiddleware, getUserPosts);

module.exports = router;
