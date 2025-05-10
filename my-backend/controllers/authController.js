import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser } from '../services/dynamoService.js';
import { getUserByUsername } from '../services/dynamoService.js';  // Ensure this points to the correct file

// Register User
const registerUser = async (req, res) => {
  const { username, password, email } = req.body;

  // Create the new user object without hashing the password
  const newUser = {
    username,
    password,  // Store the password as plain text
    email,
  };

  try {
    // Ensure createUser method is correctly implemented
    const { success, error } = await createUser(newUser);

    if (success) {
      return res.status(201).json({ message: 'User created successfully' });
    } else {
      return res.status(500).json({ message: 'Error creating user', error });
    }
  } catch (error) {
    console.error('Error in registerUser:', error);
    return res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

// Login User
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Fetch user by username (ensure username is the partition key in DynamoDB)
    const { success, data: user } = await getUserByUsername(username);

    if (!success || !user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare plain text passwords
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token if credentials are correct
    const token = jwt.sign({ userId: user.uid }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export { registerUser, login };
