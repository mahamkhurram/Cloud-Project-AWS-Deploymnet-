import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';  // Use history hook for navigation
import '../styles/WelcomePage.css'; // Import styles for animation

const WelcomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const history = useHistory(); // Initialize useHistory hook

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 1500); // Delay for 1.5 seconds
  }, []);

  const navigateToHome = () => {
    history.push('/home'); // Navigate to HomePage when the button is clicked
  };

  return (
    <div className="welcome-container">
      <div className="message">
        <h1>Welcome to Our Cloud App!</h1>
        <p>We are excited to have you here. Let's build something amazing!</p>
      </div>
      <div className={`logo-container ${isVisible ? 'show' : ''}`}>
        {/* Cloud Icon Image */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/906/906343.png"
          alt="Cloud Icon"
          className="cloud-icon"
        />
      </div>
      <div className="start-button-container">
        {/* Button to navigate to HomePage */}
        <button onClick={navigateToHome}>Start Exploring</button>
      </div>
    </div>
  );
};

export default WelcomePage;
