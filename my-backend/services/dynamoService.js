import { db, Table } from './config/db.config.js';

// Create or Update Post

const createOrUpdatePost = async (data = {}) => {
    const params = {
        TableName: Table,
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
        TableName: Table
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
        TableName: Table,
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
        TableName: Table,
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

export {
    createOrUpdatePost,
    readAllPosts,
    getPostById,
    deletePostById
};
