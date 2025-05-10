import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes instead of Switch
import WelcomePage from './components/WelcomePage';
import Register from './components/Register';
import Login from './components/Login';
import PostCrud from './components/PostCrud';
import S3Upload from './components/S3Upload';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/crud" element={<PostCrud />} />
          <Route path="/upload" element={<S3Upload />} />
          <Route path="/" element={<WelcomePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
