import React, { useState } from 'react';
import axios from 'axios';
import './S3Upload.css';

const S3Upload = () => {
  const [file, setFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadSuccess('File uploaded successfully!');
    } catch (err) {
      console.error(err);
      setUploadSuccess('Error uploading file.');
    }
  };

  return (
    <div>
      <h2>Upload File to S3</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadSuccess && <p>{uploadSuccess}</p>}
    </div>
  );
};

export default S3Upload;
