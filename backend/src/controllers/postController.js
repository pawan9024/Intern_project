
const Post = require('../models/Post');

// Create a new post
exports.createPost = async (req, res) => {
    const { content } = req.body;
    try {
        const newPost = new Post({
            content,
            author: req.user.id,
        });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Error creating post', error: error.message });
    }
};

// Get all posts
exports.getPosts = async (req, res) => {
    try {
        // Populate the author field to get the name
        const posts = await Post.find().populate('author', 'name').sort({ createdAt: -1 }); // Sort by newest first
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Error fetching posts', error: error.message });
    }
};

// Delete a post
exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user.id; // ID of the authenticated user

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if the authenticated user is the author of the post
        if (post.author.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized: You can only delete your own posts' });
        }

        await post.remove(); // or Post.findByIdAndDelete(postId);
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
