import express from 'express';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config(); // Make sure to call this to load the .env variables

const router = express.Router();

// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Endpoint to generate pre-signed URL
router.get('/get-presigned-url', (req, res) => {
  const { fileName, fileType } = req.query;  // Ensure these are passed in the request
  
  if (!fileName || !fileType) {
    return res.status(400).json({ error: 'Missing file name or file type' });
  }

  const s3Params = {
    Bucket: process.env.S3_BUCKET_NAME,  // Use the correct bucket name from the .env file
    Key: fileName,
    Expires: 60 * 15,  // Expiry time in seconds
    ContentType: fileType,
    ACL: 'public-read',  // Set permissions to public-read
  };

  s3.getSignedUrl('putObject', s3Params, (err, url) => {
    if (err) {
      console.error('Error generating pre-signed URL:', err);
      console.log("Pre-signed URL:", url); 
      return res.status(500).json({ error: 'Error generating pre-signed URL' });
    }

    res.json({ url });  // Send the pre-signed URL to the frontend
  });
});
// This will log the URL returned by the backend

export default router;
