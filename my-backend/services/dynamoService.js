const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');

// Initialize DynamoDB client
const dynamoDBClient = new DynamoDBClient({ region: process.env.AWS_REGION });

// Use DynamoDBDocumentClient for easier interaction with DynamoDB
const dynamoDB = DynamoDBDocumentClient.from(dynamoDBClient);

// Helper function to get DynamoDB table parameters
const getDBParams = (TableName) => ({
  TableName,
});

module.exports = {
  getDBParams,
  dynamoDB,
};