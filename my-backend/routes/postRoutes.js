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
// Update Post by ID
router.put('/post/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  
  const { success, message, error } = await createOrUpdatePost({
    postId: id,  // Pass postId (from the URL)
    title,
    description,
  });

  if (success) {
    return res.json({ success, message });
  }
  
  return res.status(500).json({ success: false, message: message || error });
});

// Delete Post by ID
router.delete('/post/:id', async (req, res) => {
  const { id } = req.params;  // Extract the postId from the URL
  const { success, message } = await deletePostById(id);  // Pass the postId to deletePostById

  if (success) {
    return res.json({ success });  // Return success if deletion was successful
  }

  return res.status(500).json({ success: false, message: message || 'Error deleting post' });  // Return error message if deletion failed
});


export default router;
