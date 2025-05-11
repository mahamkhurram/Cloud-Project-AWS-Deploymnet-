import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';  // Import icons
import './PostCrud.css';

const PostCrud = () => {
  const { state } = useLocation();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [newPostDescription, setNewPostDescription] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [editPostId, setEditPostId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const navigate = useNavigate();  // Navigate hook for redirecting

  const token = state?.token;

  useEffect(() => {
    if (token) {
      fetchPosts();
    }
  }, [token]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/posts', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setPosts(response.data.data);
    } catch (error) {
      console.error('Error fetching posts:', error.response?.data?.message || error.message);
    }
  };

  const handleCreatePost = async () => {
    if (!newPost.trim() || !newPostDescription.trim()) {
      alert("Post content cannot be empty.");
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/post', { title: newPost, description: newPostDescription }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchPosts();
      setShowPopup(false);
      setNewPost('');
      setNewPostDescription('');
    } catch (error) {
      console.error('Error creating post:', error.response?.data?.message || error.message);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setNewPost('');
    setNewPostDescription('');
    setEditPostId(null);
    setEditTitle('');
    setEditDescription('');
  };

  const handleUpdatePost = async () => {
    if (!editTitle.trim() || !editDescription.trim()) {
      alert("Title and Description cannot be empty.");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/post/${editPostId}`, {
        title: editTitle,
        description: editDescription
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchPosts();
      handleClosePopup();
    } catch (error) {
      console.error('Error updating post:', error.response?.data?.message || error.message);
    }
  };

  const handleDeletePost = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/post/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        fetchPosts();
      } catch (error) {
        console.error('Error deleting post:', error.response?.data?.message || error.message);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editPostId) {
      handleUpdatePost();
    } else {
      handleCreatePost();
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div>
      {/* Header with logo on left and buttons on right */}
      <div className="header">
        <div className="logo-container">
          <img
            src="https://cdn-icons-png.flaticon.com/512/906/906343.png"
            alt="Cloud Icon"
            className="home-icon"
          />
        </div>
       <h1 className="welcome2-text">Welcome to the world of Cloud ☁️!</h1>

        <nav>
          <button className="nav-button" onClick={() => navigate('/upload')}>Upload</button>
          <button className="nav-button" onClick={() => navigate('/crud')}>Post Management</button>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </nav>
      </div>

      {/* Content */}
      <div className="post-crud-container">
        <h2>Posts List!</h2>

        {/* Table to display posts */}
        <table className="posts-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={post.postId}>
                <td>{index + 1}</td>
                <td>{post.title}</td>
                <td>{post.description}</td>
                <td>
                  <FaEdit className="edit-icon" onClick={() => {
                    setEditPostId(post.postId);
                    setEditTitle(post.title);
                    setEditDescription(post.description);
                    setShowPopup(true);
                  }} />
                </td>
                <td>
                  <FaTrashAlt className="delete-icon" onClick={() => handleDeletePost(post.postId)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Create New Post Button */}
        <button className="create-btn" onClick={() => setShowPopup(true)}>Create Post</button>

        {/* Create Post Popup */}
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <h3>{editPostId ? "Edit Post" : "Create New Post"}</h3>
              <input
                type="text"
                placeholder="Title"
                value={editPostId ? editTitle : newPost}
                onChange={(e) => editPostId ? setEditTitle(e.target.value) : setNewPost(e.target.value)}
              />
              <textarea
                placeholder="Description"
                value={editPostId ? editDescription : newPostDescription}
                onChange={(e) => editPostId ? setEditDescription(e.target.value) : setNewPostDescription(e.target.value)}
              />
              <button onClick={handleSubmit}>
                {editPostId ? "Update" : "Create"}
              </button>
              <button className="close-btn" onClick={handleClosePopup}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCrud;
