import express from 'express';
import { registerUser, login } from '../controllers/authController.js';

const router = express.Router();

// Register Route
router.post('/register', registerUser);

// Login Route
router.post('/login', login);

export default router;
