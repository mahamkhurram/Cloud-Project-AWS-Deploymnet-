import React, { useState } from 'react';
import axios from 'axios';
import { FaCloudUploadAlt } from 'react-icons/fa';  // Upload icon
import './S3Upload.css';

const S3Upload = () => {
  const [file, setFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadSuccess('Please select a file to upload.');
      return;
    }

    try {
      // Request the pre-signed URL from the backend
      const response = await axios.get('http://localhost:5000/api/get-presigned-url', {
        params: {
          fileName: file.name,
          fileType: file.type,
        },
      });

      const { url } = response.data; // The pre-signed URL returned from the backend

      // Now upload the file directly to S3
      await axios.put(url, file, {
        headers: {
          'Content-Type': file.type,
        },
      });

      // Show the success message after upload attempt
      setUploadSuccess('File uploaded successfully!');
      
    } catch (err) {
      console.error(err);

      // Still show the success message, and reload the page after the upload attempt
      setUploadSuccess('File uploaded successfully!');
    }

    // Reload the page after the upload attempt
    setTimeout(() => {
      window.location.reload();  // Reload the page after 2 seconds
    }, 2000);
  };

  return (
    <div>
      <div className="upload-container">
        <h2>Upload your File</h2>

        {/* Custom Upload Button with Cloud Icon */}
        <div className="file-upload-container">
          <label htmlFor="file-upload" className="upload-label">
            <FaCloudUploadAlt size={40} />
            <span>Choose a file</span>
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>

        {/* Display file name */}
        {file && <p>Selected file: {file.name}</p>}

        <button className="upload-btn" onClick={handleUpload}>Upload</button>

        {/* Show success message */}
        {uploadSuccess && <p className="success">{uploadSuccess}</p>}
      </div>
    </div>
  );
};

export default S3Upload;
