import { db, PostsTable, UsersTable } from './config/db.config.js';  // Import db config
import { v4 as uuidv4 } from 'uuid';

// POST operations

// Create or Update Post




const createOrUpdatePost = async (data = {}) => {
  let { postId, title, description } = data;

  // Generate a new UUID if postId is not provided
  postId = postId || uuidv4();

  // Ensure title and description are provided
  if (!title || !description) {
    return { success: false, error: 'Title and Description are required.' };
  }

  const post = {
    postId,
    title,
    description,
    createdAt: new Date().toISOString(),
  };

  const params = {
    TableName: PostsTable,
    Item: post,
  };

  try {
    // Check if post already exists (optional but preserved)
    const existingPost = await db.get({ TableName: PostsTable, Key: { postId } }).promise();

    if (existingPost.Item) {
      // Update the existing post
      const updateParams = {
        TableName: PostsTable,
        Key: { postId },
        UpdateExpression: 'SET title = :title, description = :description',
        ExpressionAttributeValues: {
          ':title': title,
          ':description': description,
        },
        ReturnValues: 'UPDATED_NEW',
      };

      await db.update(updateParams).promise();
      return { success: true, message: 'Post updated successfully' };
    } else {
      // Create a new post
      await db.put(params).promise();
      return { success: true, message: 'Post created successfully', postId };
    }
  } catch (error) {
    console.error('❌ Error in createOrUpdatePost:', error);
    return { success: false, error: error.message };
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
const deletePostById = async (value, key = 'postId') => {
  const params = {
    TableName: PostsTable,
    Key: {
      [key]: value,  // The value should be used directly as a string (UUID)
    }
  };

  try {
    await db.delete(params).promise();
    return { success: true };  // Return success if deletion is successful
  } catch (error) {
    console.error('Error deleting post:', error);  // Log the error for debugging
    return { success: false, message: error.message };  // Return detailed error message
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
