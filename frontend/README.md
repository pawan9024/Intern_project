# Mini LinkedIn Platform - Frontend

This project is a mini LinkedIn-like community platform built with React for the frontend, Node.js (Express) for the backend, and MongoDB for the database. The application features user authentication, a public post feed, and user profile pages.

## Features

- **User Authentication**: Users can register and log in to their accounts.
- **Public Post Feed**: Users can create and view posts from other users.
- **User Profiles**: Each user has a profile page displaying their information and posts.

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd mini-linkedin-platform
   ```

2. Navigate to the frontend directory:
   ```
   cd frontend
   ```

3. Install the frontend dependencies:
   ```
   npm install
   ```

4. Navigate to the backend directory:
   ```
   cd ../backend
   ```

5. Install the backend dependencies:
   ```
   npm install
   ```

6. Create a `.env` file in both the `frontend` and `backend` directories and add the necessary environment variables.

### Running the Application

1. Start the backend server:
   ```
   cd backend
   npm start
   ```

2. Start the frontend application:
   ```
   cd frontend
   npm start
   ```

The application should now be running on `http://localhost:3000` for the frontend and `http://localhost:5000` for the backend.

## Folder Structure

- **frontend**: Contains all frontend-related code.
  - **src**: Source files for the React application.
  - **components**: Reusable components for authentication, feed, and profiles.
  - **pages**: Different pages of the application.
  - **styles**: Tailwind CSS styles.
  
- **backend**: Contains all backend-related code.
  - **src**: Source files for the Express application.
  - **controllers**: Logic for handling requests.
  - **models**: MongoDB models.
  - **routes**: API routes.
  - **middleware**: Authentication middleware.
  - **config**: Database configuration.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License

This project is licensed under the MIT License.