import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';  // Import cors
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';


// Load environment variables from .env file

dotenv.config();

const app = express();


// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000',  // Allow only requests from localhost:3000 (your React frontend)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow specific HTTP methods
  credentials: true  // Allow credentials (like cookies or authorization headers)
}));

// Middleware to parse JSON requests
=======

app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', postRoutes);


// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);

// Log server start
const port = process.env.PORT || 6000;  // Default to port 6000 if not defined in .env

// Listening on all network interfaces (0.0.0.0) to make the server accessible externally
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);

});

// Handle SIGINT (Ctrl+C) gracefully
process.on('SIGINT', () => {
    console.log('Received SIGINT. Shutting down gracefully...');
    // Add any cleanup code here, like closing database connections, if necessary
    process.exit(0);  // Exit with code 0, indicating no error
});

// Log uncaught exceptions and unhandled promise rejections
process.on('uncaughtException', (error) => {
    console.error('Uncaught exception: ', error);
    process.exit(1);  // Exit with a non-zero code to indicate an error
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled rejection at: ', promise, 'reason: ', reason);
    process.exit(1);  // Exit with a non-zero code to indicate an error
});
