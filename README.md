# Cloud Computing Project

## Table of Contents
1. [Project Overview](#project-overview)
2. [Folder Structure](#folder-structure)
3. [Frontend - React](#frontend-react)
4. [Backend - Node.js](#backend-nodejs)
5. [Features](#features)
6. [Running Locally](#running-locally)
7. [Deployment](#deployment)
8. [Links](#links)

---

## Project Overview

This is a cloud-based web application built using modern cloud-native architecture principles. The application consists of a **frontend** deployed on **Elastic Beanstalk** and a **backend** deployed on **Amazon EC2**. The frontend is built using **React** and the backend is powered by **Node.js**. The app performs **CRUD operations**, **user authentication**, and supports **file/image uploads** to **AWS S3**.

The backend is powered by **Amazon DynamoDB** for data persistence, and it contains two primary tables:
- **posts**: Stores data related to user posts.
- **users**: Stores user authentication and profile information.

The project is deployed on AWS and follows secure access controls, including VPC, IAM roles, and security groups.

---

## Folder Structure

The project is divided into two main folders:
- **cloud-computing-frontend**: Contains the React-based frontend code.
- **my-backend**: Contains the Node.js-based backend code.

## Features

- **User Authentication**: User registration, login, and session management.
- **CRUD Operations**: Perform Create, Read, Update, Delete on entities (e.g., posts).
- **File/Image Uploads**: Supports uploading and retrieving media assets from **AWS S3**.
- **Responsive UI**: Built with **React** for a responsive, user-friendly interface.
- **Database**: Integrated with **Amazon DynamoDB** for efficient data storage.
- **Security**: Uses **IAM roles**, **Security Groups**, and **VPC** configurations for secure access to AWS resources.

## Running Locally

To run the project locally, you need to start both the frontend and backend applications. Follow the steps below:

### 1. Start the Frontend Locally

Run the following commands to start the frontend application locally:


#### Navigate to the frontend folder
cd cloud-computing-frontend

#### Install dependencies
npm install

#### Start the React app

npm start

This will start the frontend, and you can access it at http://localhost:3000.
### 2. Start the Backend Locally

Run the following commands to start the backend application locally:


#### Navigate to the backend folder
cd my-backend

#### Install dependencies
npm install

#### Start the backend server
node server.js
## Deployment

The application is deployed in a cloud-based architecture using AWS services:

- **Frontend**: Deployed on **AWS Elastic Beanstalk**.
- **Backend**: Deployed on **Amazon EC2** inside a Docker container.
- **Database**: Hosted on **Amazon DynamoDB**.
- **File/Image Storage**: Managed via **AWS S3**.

### Deployment Links:
- **Frontend (Elastic Beanstalk)**: [http://cloudcomputing-env.eba-g22mshge.us-east-1.elasticbeanstalk.com/](http://cloudcomputing-env.eba-g22mshge.us-east-1.elasticbeanstalk.com/)
- **Backend (EC2)**: [http://54.173.73.252:5000/api/posts](http://54.173.73.252:5000/api/posts)

### Additional Resources:
- [AWS Elastic Beanstalk Documentation](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html)
- [AWS EC2 Documentation](https://docs.aws.amazon.com/ec2/index.html)
- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/index.html)
- [AWS DynamoDB Documentation](https://docs.aws.amazon.com/dynamodb/index.html)

## Security & IAM

- IAM roles have been configured for secure access to **EC2**, **S3**, and **DynamoDB**.
- Security Groups are set up to control inbound and outbound traffic.
- HTTPS is configured for secure communication between the frontend, backend, and users.

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

