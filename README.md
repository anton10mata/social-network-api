# Social Network API

## Description

## The Social Network API is a backend application built for a social media startup. It enables users to share their thoughts, react to friends' thoughts, and manage a list of friends. The API is built using Node.js, Express.js, MongoDB, and Mongoose.

# This project demonstrates the implementation of CRUD operations for users, thoughts, and reactions, as well as relationships between users (friends).

# Table of Contents

## Installation

## Usage

## Routes

## User Routes

## Thought Routes

## Friend Routes

## Walkthrough Video

## Technologies Used

## License

# Installation

Clone the repository:

git clone <repository-url>

## Navigate to the project directory:

cd social-network-api

## Install dependencies:

npm install

## Start MongoDB:

If you are running MongoDB locally, ensure that it is installed and running.

If using MongoDB Atlas, update the connection string in server.js.

## Start the server:

npm run dev

# Usage

Use a tool like Insomnia or Postman to test the API endpoints.

The server will run on http://localhost:3001 by default.

Routes

User Routes

Method

Endpoint

Description

GET

/api/users

Get all users

GET

/api/users/:userId

Get a single user by ID

POST

/api/users

Create a new user

PUT

/api/users/:userId

Update a user by ID

DELETE

/api/users/:userId

Delete a user by ID

Sample User Data

{
  "username": "testuser",
  "email": "testuser@example.com"
}

Thought Routes

Method

Endpoint

Description

GET

/api/thoughts

Get all thoughts

GET

/api/thoughts/:thoughtId

Get a single thought by ID

POST

/api/thoughts

Create a new thought

PUT

/api/thoughts/:thoughtId

Update a thought by ID

DELETE

/api/thoughts/:thoughtId

Delete a thought by ID

Sample Thought Data

{
  "thoughtText": "This is a test thought!",
  "username": "testuser",
  "userId": "<userId>"
}

Reaction Routes

Method

Endpoint

Description

POST

/api/thoughts/:thoughtId/reactions

Add a reaction to a thought

DELETE

/api/thoughts/:thoughtId/reactions/:reactionId

Remove a reaction from a thought

Sample Reaction Data

{
  "reactionBody": "This is a reaction!",
  "username": "testuser"
}

Friend Routes

Method

Endpoint

Description

POST

/api/users/:userId/friends/:friendId

Add a friend to a user's friend list

DELETE

/api/users/:userId/friends/:friendId

Remove a friend from a user's friend list

Walkthrough Video

A walkthrough video demonstrating the functionality of the API can be found here.

Technologies Used

Node.js

Express.js

MongoDB

Mongoose

Insomnia

License

This project is licensed under the MIT License. See the LICENSE file for details.