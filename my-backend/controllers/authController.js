import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, getUserByUsername } from '../services/dynamoService.js'; // Updated imports

// Register User
const registerUser = async (req, res) => {
    const { username, password, email } = req.body;

    // Hash password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        username,
        password: hashedPassword,
        email,
    };

    const { success, error } = await createUser(newUser);

    if (success) {
        return res.status(201).json({ message: 'User created successfully' });
    } else {
        return res.status(500).json({ message: 'Error creating user', error });
    }
};

// Login User
const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Fetch user from DynamoDB
        const { success, data: user } = await getUserByUsername(username);

        if (!success || !user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check if passwords match
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export { registerUser, login };
