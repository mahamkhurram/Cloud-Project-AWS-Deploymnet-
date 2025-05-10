const { dynamoDB, getDBParams } = require('../services/dynamoService');

// Define the user model to interact with DynamoDB
const createUser = async (user) => {
  const params = getDBParams('users'); // Assuming the table is named 'users'
  params.Item = user; // The item to store in DynamoDB

  try {
    await dynamoDB.put(params).promise();
    return user;
  } catch (error) {
    throw new Error('Error creating user in DynamoDB', error);
  }
};

// Find a user by username
const getUserByUsername = async (username) => {
  const params = getDBParams('users'); // Assuming the table is named 'users'
  params.Key = { username }; // The key we use to search by

  try {
    const result = await dynamoDB.get(params).promise();
    if (!result.Item) {
      throw new Error('User not found');
    }
    return result.Item;
  } catch (error) {
    throw new Error('Error fetching user from DynamoDB', error);
  }
};

module.exports = {
  createUser,
  getUserByUsername
};
