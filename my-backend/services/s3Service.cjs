const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config({ path: '../.env' }); // Adjust the path as needed

// Configure AWS SDK with credentials and region
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Debugging: Log the loaded environment variables
console.log('AWS_ACCESS_KEY_ID:', process.env.AWS_ACCESS_KEY_ID);
console.log('AWS_SECRET_ACCESS_KEY:', process.env.AWS_SECRET_ACCESS_KEY);
console.log('AWS_REGION:', process.env.AWS_REGION);

// Create an S3 instance
const s3 = new AWS.S3();

// Function to upload a file to S3
const uploadFileToS3 = async (filePath, bucketName) => {
  const expandedPath = path.resolve(filePath); // Resolve the file path to the full absolute path
  const fileName = path.basename(expandedPath); // Get the file name from the full path
  const fileStream = fs.createReadStream(expandedPath); // Create a readable stream of the file

  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: fileStream,
    ContentType: 'application/octet-stream', // Adjust the content type if needed
  };

  try {
    const data = await s3.upload(params).promise(); // Upload the file to S3
    return { success: true, data }; // Return success response
  } catch (error) {
    console.error('Error uploading to S3:', error); // Log the error
    return { success: false, error: error.message }; // Return failure response
  }
};

// Test case for uploading a file from the local machine
if (require.main === module) {
  (async () => {
    const filePath = 'C:\\Users\\hp\\Downloads\\0.PNG'; // Full path to your file
    const bucketName = 'privatebucketuser'; // Use your actual bucket name
    const result = await uploadFileToS3(filePath, bucketName);
    console.log(result.success ? 'File uploaded successfully' : 'File upload failed');
    console.log(result.data || result.error);
  })();
}

module.exports = { uploadFileToS3 };