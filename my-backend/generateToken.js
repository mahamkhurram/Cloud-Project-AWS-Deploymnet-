const jwt = require('jsonwebtoken');

// Generate a random JWT token
const generateToken = () => {
  const payload = {
    id: '12345', // Example user ID
    username: 'testuser', // Example username
  };

  const secret = 'your_jwt_secret'; // Replace with your actual secret key
  const options = { expiresIn: '1h' }; // Token expires in 1 hour

  const token = jwt.sign(payload, secret, options);
  return token;
};

// Example usage
const token = generateToken();
console.log('Generated JWT Token:', token);