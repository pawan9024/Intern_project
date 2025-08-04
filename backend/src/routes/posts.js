
const express = require('express');
const { createPost, getPosts, deletePost } = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createPost);
router.get('/', getPosts);
router.delete('/:id', authMiddleware, deletePost); // New route for deleting posts

module.exports = router;
