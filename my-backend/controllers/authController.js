import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getPostById } from '../services/dynamoService.js'; // Replace 'getItem' with the correct export

// Login
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Fetch user from DynamoDB
        const user = await getItem('Users', { username });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export { login };
