const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  // Handle registration logic (e.g., hashing password, storing in DB)
};

const login = async (req, res) => {
  const { username, password } = req.body;
  // Validate user and issue JWT
  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

module.exports = { register, login };
