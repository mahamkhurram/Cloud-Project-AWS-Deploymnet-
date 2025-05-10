const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const getDBParams = (TableName) => ({
  TableName,
});

module.exports = {
  getDBParams,
  dynamoDB,
};
