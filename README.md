# Mini LinkedIn Platform

This project is a mini LinkedIn-like community platform built using React for the frontend, Node.js (Express) for the backend, and MongoDB for the database. The platform includes user authentication, a public post feed, and user profile pages.

## Features

- **User Authentication**: Users can register and log in to their accounts.
- **Public Post Feed**: Users can create and view posts in a public feed.
- **User Profiles**: Each user has a profile page displaying their information and posts.

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB

## Project Structure

```
mini-linkedin-platform
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── models
│   │   ├── routes
│   │   ├── middleware
│   │   ├── config
│   │   └── app.js
│   ├── .env
│   ├── package.json
│   └── README.md
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── styles
│   ├── .env
│   ├── package.json
│   ├── tailwind.config.js
│   └── README.md
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd mini-linkedin-platform
   ```

2. Set up the backend:
   - Navigate to the `backend` directory:
     ```
     cd backend
     ```
   - Install dependencies:
     ```
     npm install
     ```
   - Create a `.env` file in the `backend` directory and add your MongoDB connection string and other environment variables.

3. Set up the frontend:
   - Navigate to the `frontend` directory:
     ```
     cd ../frontend
     ```
   - Install dependencies:
     ```
     npm install
     ```

### Running the Application

1. Start the backend server:
   ```
   cd backend
   npm start
   ```

2. Start the frontend application:
   ```
   cd ../frontend
   npm start
   ```

### Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

### License

This project is licensed under the MIT License.