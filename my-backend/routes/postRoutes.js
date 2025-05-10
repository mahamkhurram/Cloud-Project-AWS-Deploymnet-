import express from 'express';
import { createOrUpdatePost, deletePostById, getPostById, readAllPosts } from '../services/dynamoService.js';

const router = express.Router();

// READ ALL Posts
router.get('/posts', async (req, res) => {
    const { success, data } = await readAllPosts();

    if (success) {
        return res.json({ success, data });
    }
    return res.status(500).json({ success: false, message: 'Error fetching posts' });
});

// Get Post by ID
router.get('/post/:id', async (req, res) => {
    const { id } = req.params;
    const { success, data } = await getPostById(id);

    if (success) {
        return res.json({ success, data });
    }
    return res.status(500).json({ success: false, message: 'Error fetching post' });
});

// Create Post
router.post('/post', async (req, res) => {
    const { success } = await createOrUpdatePost(req.body);

    if (success) {
        return res.json({ success });
    }

    return res.status(500).json({ success: false, message: 'Error creating post' });
});

// Update Post by ID
router.put('/post/:id', async (req, res) => {
    const post = req.body;
    const { id } = req.params;
    post.id = parseInt(id);

    const { success } = await createOrUpdatePost(post);

    if (success) {
        return res.json({ success });
    }

    return res.status(500).json({ success: false, message: 'Error updating post' });
});

// Delete Post by ID
router.delete('/post/:id', async (req, res) => {
    const { id } = req.params;
    const { success } = await deletePostById(id);

    if (success) {
        return res.json({ success });
    }

    return res.status(500).json({ success: false, message: 'Error deleting post' });
});

export default router;
