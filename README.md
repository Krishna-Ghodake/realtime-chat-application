# Real-Time Chat Application

A full-stack real-time chat application built with React, Node.js, Express, Socket.io, and SQLite.

The application supports persistent message storage through SQLite and instant message delivery between connected clients using Socket.io.

# Features

- Real-time messaging using Socket.io
- React-based frontend
- Node.js + Express backend
- SQLite database for persistent messages
- REST API for sending and retrieving messages
- Message timestamps
- Connection/disconnection status
- Two-way real-time communication
- Message history restored after page refresh
- Input validation and basic error handling
- Responsive chat interface

# Tech Stack

# Frontend

- React
- Vite
- JavaScript
- CSS
- Socket.io Client

# Backend

- Node.js
- Express
- Socket.io
- SQLite
- CORS

# Development Tools

- Git
- GitHub
- ESLint
- VS Code

# Project Structure

```text
realtime-chat-application/
│
├── backend/
│   ├── database/
│   │   └── db.js
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── .gitignore
└── README.md


                React Frontend
               localhost:5173
                      │
             HTTP REST + Socket.io
                      │
                      ▼
             Node.js + Express
               localhost:5001
                      │
              ┌───────┴───────┐
              │               │
          REST API         Socket.io
              │               │
              └───────┬───────┘
                      ▼
                 SQLite DB

The frontend communicates with the backend through REST APIs for persistent message operations and retrieving chat history. Socket.io provides real-time message delivery between connected clients.

# How It Works
Sending a Message
The user enters their name and message.
React sends the message to the backend through the REST API.
Express stores the message in SQLite.
The saved message is returned to the frontend.
Socket.io broadcasts the saved message to connected clients.
Connected clients display the message immediately without refreshing.
Loading Previous Messages

When the application loads:

React requests existing messages using the REST API.
The backend retrieves messages from SQLite.
The frontend displays the returned message history.

This allows messages to remain available after refreshing the page.

API Endpoints
Get Messages
GET /api/messages

Returns all stored chat messages.

Example response:

[
  {
    "id": 1,
    "username": "Krishna",
    "message": "Hello from the chat application",
    "timestamp": "2026-08-09 10:57:06"
  }
]
Create Message
POST /api/messages

Request body:

{
  "username": "Krishna",
  "message": "Hello from the chat application"
}

The backend stores the message in SQLite and returns the saved message.

Socket.io Events
Client → Server
sendMessage

Used to broadcast a newly saved message to connected clients.

Server → Client
newMessage

Used to deliver new messages to connected clients in real time.

Connection Events
connect
disconnect

The frontend monitors these events and displays the current Socket.io connection status.

Installation
Prerequisites

# Make sure you have:

Node.js
npm
Git
Clone the Repository
git clone https://github.com/Krishna-Ghodake/realtime-chat-application.git
cd realtime-chat-application
Backend Setup

Open a terminal:

cd backend
npm install
node server.js

The backend runs on:

http://localhost:5001

Expected output:

Server running on http://localhost:5001
Connected to SQLite database
Messages table is ready
Frontend Setup

Open another terminal:

cd frontend
npm install
npm run dev

The frontend runs on:

http://localhost:5173

Open the frontend URL in your browser.

Testing Real-Time Communication
Start the backend.
Start the frontend.
Open http://localhost:5173 in two browser windows.
Enter a username in each window.
Send a message from Window 1.
Verify that it appears automatically in Window 2.
Send a message from Window 2.
Verify that it appears automatically in Window 1.

Messages should appear instantly without requiring a page refresh.

Database

The application uses SQLite for persistent message storage.

Each message contains:

id
username
message
timestamp

The database file is excluded from Git using .gitignore.


# Environment Variables

No environment variables are currently required for the local development version.

The current development URLs are:

Frontend: http://localhost:5173
Backend:  http://localhost:5001

For production deployment, these URLs can be configured using environment variables.

Design Decisions
Why REST API + Socket.io?

REST APIs provide a simple mechanism for persistent message operations and retrieving chat history.

Socket.io provides low-latency, event-based communication between connected clients.

Using both allows the application to combine:

Persistent storage
Message history
Real-time communication
Why SQLite?

SQLite is lightweight and requires no separate database server, making it suitable for this assessment and local development.

For a production-scale deployment with many concurrent users, a hosted database would be more appropriate.

# Assumptions
Users do not need account authentication for this assessment.
Messages are stored locally using SQLite.
The application is designed primarily as a demonstration of real-time communication.
Username uniqueness is not required.
The current implementation does not include private messaging.
Future Improvements

#Author
Krishna Ghodake
The frontend communicates with the backend through REST APIs for persistent message operations and retrieving chat history. Socket.io provides real-time message delivery between connected clients.

How It Works
Sending a Message
The user enters their name and message.
React sends the message to the backend through the REST API.
Express stores the message in SQLite.
The saved message is returned to the frontend.
Socket.io broadcasts the saved message to connected clients.
Connected clients display the message immediately without refreshing.
Loading Previous Messages

When the application loads:

React requests existing messages using the REST API.
The backend retrieves messages from SQLite.
The frontend displays the returned message history.

This allows messages to remain available after refreshing the page.

API Endpoints
Get Messages
GET /api/messages

Returns all stored chat messages.

Example response:

[
  {
    "id": 1,
    "username": "Krishna",
    "message": "Hello from the chat application",
    "timestamp": "2026-08-09 10:57:06"
  }
]
Create Message
POST /api/messages

Request body:

{
  "username": "Krishna",
  "message": "Hello from the chat application"
}

The backend stores the message in SQLite and returns the saved message.

Socket.io Events
Client → Server
sendMessage

Used to broadcast a newly saved message to connected clients.

Server → Client
newMessage

Used to deliver new messages to connected clients in real time.

Connection Events
connect
disconnect

The frontend monitors these events and displays the current Socket.io connection status.

Installation
Prerequisites

Make sure you have:

Node.js
npm
Git
Clone the Repository
git clone https://github.com/Krishna-Ghodake/realtime-chat-application.git
cd realtime-chat-application
Backend Setup

Open a terminal:

cd backend
npm install
node server.js

The backend runs on:

http://localhost:5001

Expected output:

Server running on http://localhost:5001
Connected to SQLite database
Messages table is ready
Frontend Setup

Open another terminal:

cd frontend
npm install
npm run dev

The frontend runs on:

http://localhost:5173

Open the frontend URL in your browser.

Testing Real-Time Communication
Start the backend.
Start the frontend.
Open http://localhost:5173 in two browser windows.
Enter a username in each window.
Send a message from Window 1.
Verify that it appears automatically in Window 2.
Send a message from Window 2.
Verify that it appears automatically in Window 1.

Messages should appear instantly without requiring a page refresh.

Database

The application uses SQLite for persistent message storage.

Each message contains:

id
username
message
timestamp

The database file is excluded from Git using .gitignore.

Environment Variables

No environment variables are currently required for the local development version.

The current development URLs are:

Frontend: http://localhost:5173
Backend:  http://localhost:5001

For production deployment, these URLs can be configured using environment variables.

Design Decisions
Why REST API + Socket.io?

REST APIs provide a simple mechanism for persistent message operations and retrieving chat history.

Socket.io provides low-latency, event-based communication between connected clients.

Using both allows the application to combine:

Persistent storage
Message history
Real-time communication
Why SQLite?

SQLite is lightweight and requires no separate database server, making it suitable for this assessment and local development.

For a production-scale deployment with many concurrent users, a hosted database would be more appropriate.

Assumptions
Users do not need account authentication for this assessment.
Messages are stored locally using SQLite.
The application is designed primarily as a demonstration of real-time communication.
Username uniqueness is not required.
The current implementation does not include private messaging.
Future Improvements

Possible future enhancements include:

User authentication
Typing indicators
Read receipts
Private conversations
Online user list
Message deletion/editing
File and image sharing
Production database
Production environment configuration
Author

Krishna Ghodake

Built as a full-stack real-time chat application demonstrating React, Node.js, Express, Socket.io, REST APIs, and SQLite.