
const User = require('../models/User');
const Post = require('../models/Post');

// Fetch user profile by ID
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Fetch posts by this user
        const posts = await Post.find({ author: user._id }).populate('author', 'name'); // Populate author name for posts
        res.status(200).json({ user, posts });
    } catch (error) {
        console.error('Error in getUserProfile:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
    try {
        // Ensure the authenticated user is updating their own profile
        if (req.user.id !== req.params.id) {
            return res.status(403).json({ message: 'Forbidden: You can only update your own profile.' });
        }

        const { name, bio } = req.body;
        const user = await User.findByIdAndUpdate(req.user.id, { name, bio }, { new: true }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error in updateUserProfile:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Fetch posts by user ID (This function might be redundant if getUserProfile already fetches posts)
// Keeping it for now as it was in original code, but consider if it's truly needed.
exports.getUserPosts = async (req, res) => {
    try {
        const posts = await Post.find({ author: req.params.userId }).populate('author', 'name');
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error in getUserPosts:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
