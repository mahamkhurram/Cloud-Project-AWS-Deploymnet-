
const { dynamoDB, getDBParams } = require('../services/dynamoService');

// Get all posts from DynamoDB
const getPosts = async () => {
  const params = getDBParams(process.env.DYNAMO_DB_TABLE);  // 'posts' table

  try {
    const data = await dynamoDB.scan(params).promise();  // Fetch posts
    return data.Items;  // Return the posts
  } catch (error) {
    throw new Error('Error fetching posts', error);
  }
};

const createNewPost = async (req, res) => {
  const post = req.body;
  const params = getDBParams(process.env.DYNAMO_DB_TABLE);
  params.Item = post;

  try {
    await dynamoDB.put(params).promise();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error });
  }
};

module.exports = { getPosts, createNewPost };
