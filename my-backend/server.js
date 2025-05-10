import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';


dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', postRoutes);


const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
