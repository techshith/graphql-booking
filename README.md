# Event Booking App

This is a full-stack event booking application built with GraphQL, React, Node.js, and MongoDB.

It allows users to:
--Sign up and log in
-- Create and view events
-- Book events
-- See and cancel their own bookings

# Tech Stack

- **Frontend**: React + Context API
- **Backend**: Node.js, Express, GraphQL
- **Database**: MongoDB Atlas
- **Authentication**: JWT (JSON Web Tokens)
- **Data Optimization**: DataLoader for batching queries

# Project Structure

/client → React frontend
/graphql → GraphQL schemas & resolvers
/models → Mongoose models
/middleware → Auth middleware
/server.js → Express server

css
Copy
Edit

# Authentication

The app uses JWT to protect routes. Users must be logged in to book or cancel events.

Tokens are passed in the `Authorization` header as:

Authorization: Bearer <token>

markdown
Copy
Edit

# Setup Instructions

1. Clone the repo  
2. Run `npm install` in the root and inside `client/`  
3. Create a `.env` file in root with:

```env
MONGO_URI=your_mongo_connection_string
JWT_KEY=your_jwt_secret
Start the backend:
npm start

Start the frontend:
cd client
npm start

Open:
Backend GraphQL Playground → http://localhost:3000/graphql
Frontend App → http://localhost:3000

Feel free to use this as a base and add features on top of it!