import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Attach decoded data to the request object
        next();  // Proceed to the next middleware/route
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

export default authMiddleware;
