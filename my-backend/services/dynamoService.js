import { db, PostsTable, UsersTable } from './config/db.config.js';  // Import db config
import { v4 as uuidv4 } from 'uuid';

// POST operations

// Create or Update Post


const createOrUpdatePost = async (data = {}) => {
  // Auto-generate postId if not provided
  const postId = data.postId || uuidv4();  // Use provided postId or generate a new one
  const { title, description } = data;

  // Ensure title and description are provided
  if (!title || !description) {
    throw new Error("Title and Description are required.");
  }

  // The post object will include the auto-generated postId
  const post = {
    postId,  // Auto-generated postId (or use provided one)
    title,   // Title from request body
    description,  // Description from request body
    createdAt: new Date().toISOString(),  // Timestamp
  };

  const params = {
    TableName: PostsTable,  // Your DynamoDB table name
    Item: post  // The post object to insert into DynamoDB
  };

  try {
    console.log('Attempting to insert post into DynamoDB:', post);  // Log the data being sent to DynamoDB
    await db.put(params).promise();  // Insert the post into DynamoDB
    return { success: true, post };  // Return success and the created post
  } catch (error) {
    console.error('Error creating post:', error);  // Log the error
    return { success: false, error: error.message };  // Return error message
  }
};


// Read All Posts
const readAllPosts = async () => {
  const params = {
    TableName: PostsTable
  };

  try {
    const { Items = [] } = await db.scan(params).promise();
    return { success: true, data: Items };
  } catch (error) {
    return { success: false, error, data: null };
  }
};

// Read Post by ID
const getPostById = async (value, key = 'id') => {
  const params = {
    TableName: PostsTable,
    Key: {
      [key]: parseInt(value)
    }
  };

  try {
    const { Item = {} } = await db.get(params).promise();
    return { success: true, data: Item };
  } catch (error) {
    return { success: false, data: null };
  }
};

// Delete Post by ID
const deletePostById = async (value, key = 'id') => {
  const params = {
    TableName: PostsTable,
    Key: {
      [key]: parseInt(value)
    }
  };

  try {
    await db.delete(params).promise();
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

// USER operations

// Create User
const createUser = async (user) => {
  const userId = uuidv4();  // Generate a unique user ID (or use username if that's your choice)

  const params = {
    TableName: UsersTable,  // Ensure this matches the name of your DynamoDB table
    Item: {
      uid: userId,  // Add the unique user ID
      ...user        // Add username, email, password, etc.
    }
  };

  console.log('Creating user with the following data:', params.Item); // Log the data for inspection

  try {
    await db.put(params).promise();
    return { success: true, userId };  // Return success and the generated user ID
  } catch (error) {
    console.error('Error creating user in DynamoDB:', error);  // Log the full error
    throw new Error('Error creating user in DynamoDB: ' + error.message);
  }
};

// Get User by Username (for login)
const getUserByUsername = async (username) => {
  const params = {
    TableName: 'users',  // DynamoDB table name
    IndexName: 'username-index',  // Use the correct GSI name: 'username-index'
    KeyConditionExpression: 'username = :username',  // Query by username
    ExpressionAttributeValues: {
      ':username': username  // The value of username to search for
    }
  };

  try {
    const result = await db.query(params).promise();
    
    // Check if user was found
    if (!result.Items || result.Items.length === 0) {
      throw new Error('User not found');
    }
    
    // Return the first matching user
    return { success: true, data: result.Items[0] };
  } catch (error) {
    console.error('Error fetching user from DynamoDB:', error);
    return { success: false, error: error.message };
  }
};


export {
  createOrUpdatePost,
  readAllPosts,
  getPostById,
  deletePostById,
  createUser,
  getUserByUsername
};
