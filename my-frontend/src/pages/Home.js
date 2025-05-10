import React from 'react';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import '../styles/HomePage.css';  // Import styles

const HomePage = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Cloud-Based Application!</h1>
      <PostForm />
      <PostList />
    </div>
  );
};

export default HomePage;
