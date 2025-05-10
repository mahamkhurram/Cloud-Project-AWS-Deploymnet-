import React, { useState } from 'react';
import axios from 'axios';
import '../styles/PostForm.css';  // Import styles

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://<EC2_PUBLIC_IP>:5000/api/posts', { title, content })
      .then((response) => {
        console.log('Post created:', response.data);
        // Optionally, reset form or show success message
      })
      .catch((error) => {
        console.error('Error creating post:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <h2>Create a Post</h2>
      <label>Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label>Content</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">Create Post</button>
    </form>
  );
};

export default PostForm;
