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

### Frontend Structure:
```bash
cloud-computing-frontend/
├── build/                   # Production build of the React app
├── node_modules/            # Node.js dependencies
├── public/                  # Public assets (e.g., index.html, images)
└── src/                     # React components and CSS
    ├── Auth.css             # Styles for authentication pages
    ├── Login.js             # Login page
    ├── Navbar.js            # Navigation bar component
    ├── PostCrud.js          # CRUD for posts
    ├── Register.js          # Registration page
    ├── S3Upload.js          # File upload component for S3
    ├── WelcomePage.js       # Welcome/landing page
    ├── App.js               # Main application component
    ├── index.js             # React entry point
    ├── index.css            # Global styles
    └── package.json         # Project dependencies and scripts
