const express = require('express');
const { createNewPost, getPosts } = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Handle GET request for posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await getPosts(); // Function to fetch posts from DynamoDB
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
});

// Handle POST request for creating new posts
router.post('/posts', authMiddleware, createNewPost);

module.exports = router;
