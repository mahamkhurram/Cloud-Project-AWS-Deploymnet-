import React, { useState } from 'react';
import axios from 'axios';
import { FaUserAlt, FaEnvelope, FaLock } from 'react-icons/fa';  // Import icons
import './Auth.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPopup, setShowPopup] = useState(false);  // State for popup visibility

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        password,
        email
      });
      setSuccess(response.data.message);
      setShowPopup(true);  // Show popup when registration is successful
    } catch (err) {
      setError('Error registering user: ' + err.response?.data?.message || err.message);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form onSubmit={handleRegister}>
        <div className="input-group">
          <FaUserAlt className="input-icon" />
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="input-group">
          <FaEnvelope className="input-icon" />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="input-group">
          <FaLock className="input-icon" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Register</button>
      </form>

      {/* Success Popup */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Registration successful! Please <a href="/login">Login</a> to your account.</p>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
