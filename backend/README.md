# Mini LinkedIn Platform - Backend

This is the backend for the Mini LinkedIn-like community platform built using Node.js, Express, and MongoDB.

## Features

- User authentication (registration and login)
- Public post feed
- User profile management

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- JWT for authentication
- Tailwind CSS for styling (in the frontend)

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:

   git clone <repository-url>

2. Navigate to the backend directory:

   cd mini-linkedin-platform/backend

3. Install dependencies:

   npm install

4. Create a `.env` file in the backend directory and add your environment variables. Example:

   ```
   MONGODB_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   ```

5. Start the server:

   npm start

### API Endpoints

- **Authentication**
  - `POST /api/auth/register` - Register a new user
  - `POST /api/auth/login` - Login an existing user

- **Posts**
  - `GET /api/posts` - Retrieve all posts
  - `POST /api/posts` - Create a new post

- **Users**
  - `GET /api/users/:id` - Get user profile by ID

### Folder Structure

- `src/controllers` - Contains controller functions for handling requests
- `src/models` - Contains Mongoose models for User and Post
- `src/routes` - Contains route definitions for authentication, posts, and users
- `src/middleware` - Contains middleware for authentication
- `src/config` - Contains database connection configuration
- `src/app.js` - Entry point of the application

## License

This project is licensed under the MIT License.