import AWS from 'aws-sdk';

AWS.config.update({
    region: "us-east-1",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const db = new AWS.DynamoDB.DocumentClient();

// Default tables for users and posts
const PostsTable = 'posts'; // Change this if needed
const UsersTable = 'users'; // Table for users

export {
    db,
    PostsTable,
    UsersTable
};
