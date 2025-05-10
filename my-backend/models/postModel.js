const { dynamoDB, getDBParams } = require('../services/dynamoService');

const createPost = async (post) => {
  const params = getDBParams(process.env.DYNAMO_DB_TABLE);
  params.Item = post;

  try {
    await dynamoDB.put(params).promise();
    return post;
  } catch (error) {
    throw new Error("Error creating post", error);
  }
};

module.exports = { createPost };
