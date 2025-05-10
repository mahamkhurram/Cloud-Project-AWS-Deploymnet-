const AWS = require('aws-sdk');
const s3 = new AWS.S3();

// Function to upload file to S3
const uploadFileToS3 = async (file, bucketName) => {
  const params = {
    Bucket: bucketName,
    Key: file.name,
    Body: file.data,
    ContentType: file.mimetype,
    // Removed ACL as it's not allowed in the current bucket configuration
  };

  try {
    const data = await s3.upload(params).promise();
    return { success: true, data };
  } catch (error) {
    console.error('Error uploading to S3:', error);
    return { success: false, error: error.message };
  }
};

// Test case for uploading file (optional)
if (require.main === module) {
  (async () => {
    const mockFile = {
      name: 'test-file.txt',
      data: Buffer.from('This is a test file content'),
      mimetype: 'text/plain',
    };
    const bucketName = 'privatebucketuser';  // Use your actual bucket name
    const result = await uploadFileToS3(mockFile, bucketName);
    console.log(result.success ? 'File uploaded successfully' : 'File upload failed');
    console.log(result.data || result.error);
  })();
}

module.exports = { uploadFileToS3 };
