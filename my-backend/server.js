import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';  // Import cors
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';

dotenv.config();

const app = express();

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000',  // Allow only requests from localhost:3000 (your React frontend)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow specific HTTP methods
  credentials: true  // Allow credentials (like cookies or authorization headers)
}));

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', postRoutes);

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
