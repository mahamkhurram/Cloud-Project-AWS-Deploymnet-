// src/components/S3Upload.js
import React, { useState } from 'react';
import axios from 'axios';
import './S3Upload.css';

const S3Upload = () => {
  const [file, setFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/api/post/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadSuccess('File uploaded successfully!');
      setError('');
    } catch (err) {
      console.error(err);
      setUploadSuccess('');
      setError('Error uploading file.');
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload File to S3</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadSuccess && <p className="success">{uploadSuccess}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default S3Upload;
