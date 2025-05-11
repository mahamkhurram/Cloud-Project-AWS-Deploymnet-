import React from 'react';
import { Link } from 'react-router-dom'; // Use Link for navigation
import './WelcomePage.css';

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <div className="logo1-container">
        <img
          src="https://cdn-icons-png.flaticon.com/512/906/906343.png"
          alt="Cloud Icon"
          className="home1-icon"
        />
      </div>
      <h1 className="welcome-text">Welcome to Cloud Computing Project</h1>
      <div className="links-container">
        <Link to="/register" className="link-button">Register</Link>
        <Link to="/login" className="link-button">Login</Link>
      </div>

      <div className="about-section">
        <h2>About Cloud & AWS</h2>
        <p>
          Cloud computing is the on-demand delivery of IT resources via the internet with pay-as-you-go pricing.
          AWS (Amazon Web Services) provides a comprehensive suite of cloud services that help businesses scale,
          store data, and process information more efficiently, making it easier to leverage cutting-edge technologies.
        </p>
      </div>
    </div>
  );
};

export default WelcomePage;
