import { db, PostsTable, UsersTable } from './config/db.config.js';

// POST operations

// Create or Update Post
const createOrUpdatePost = async (data = {}) => {
    const params = {
        TableName: PostsTable,
        Item: data
    };

    try {
        await db.put(params).promise();
        return { success: true };
    } catch (error) {
        return { success: false, error };
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

// Register User
const createUser = async (userData) => {
    const { username, email, password } = userData;

    const userId = username; // Use username or email as UserID

    const params = {
        TableName: UsersTable,  // The DynamoDB Users table
        Item: {
            UserID: userId,       // Set UserID to username (or email if preferred)
            username,
            email,
            password,             // Store hashed password (should be hashed before saving)
            createdAt: new Date().toISOString(),  // Add creation timestamp
        },
    };

    try {
        // Save user to DynamoDB (similar to creating/updating posts)
        await db.put(params).promise();
        return { success: true };
    } catch (error) {
        console.error('Error creating user:', error);
        return { success: false, error };  // Return error if there is one
    }
};

// Get User by Username (for login)
const getUserByUsername = async (username) => {
    const params = {
        TableName: UsersTable,
        Key: {
            username,  // Use username to fetch the user
        }
    };

    try {
        const { Item } = await db.get(params).promise();
        return { success: true, data: Item };  // Return the user data
    } catch (error) {
        console.error('Error fetching user:', error);
        return { success: false, error };
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
