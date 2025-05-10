const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');  // Ensure this line is present
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api', postRoutes);  // Register the post routes

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
