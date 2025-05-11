import express from 'express';
import multer from 'multer';
import { createOrUpdatePost, deletePostById, getPostById, readAllPosts } from '../services/dynamoService.js';
import { uploadFileToS3 } from '../services/s3Service.cjs';

const router = express.Router();

// Setup multer for file uploads
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage: storage });

// READ ALL Posts
router.get('/posts', async (req, res) => {
    try {
        const { success, data } = await readAllPosts();

        if (success) {
            return res.json({ success, data });
        }
        return res.status(500).json({ success: false, message: 'Error fetching posts' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Get Post by ID
router.get('/post/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { success, data } = await getPostById(id);

        if (success) {
            return res.json({ success, data });
        }
        return res.status(500).json({ success: false, message: 'Error fetching post' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Create Post
router.post('/post', async (req, res) => {
    try {
        const { success } = await createOrUpdatePost(req.body);

        if (success) {
            return res.json({ success });
        }

        return res.status(500).json({ success: false, message: 'Error creating post' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

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

// Upload Post Image to S3
router.post('/post/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const bucketName = 'privatebucketuser';  // For private uploads, use your bucket name
    try {
        const result = await uploadFileToS3(req.file, bucketName);

        if (result.success) {
            return res.status(200).json({ message: 'File uploaded successfully', data: result.data });
        } else {
            return res.status(500).json({ message: 'Error uploading file', error: result.error });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error uploading file', error: error.message });
    }
});

export default router;