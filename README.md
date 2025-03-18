# Leaderboard Application

A full-stack leaderboard application built with React and MongoDB that allows users to track and vote for players. Made as an example for my [Web Dev class](https://johnguerra.co/classes/webDevelopment_spring_2025/)

## Tech Stack

- Frontend: React 19 with vite in the frontend folder
- Backend: Node.js + express5
- Database: MongoDB@8 + node mongo driver 6

## Prerequisites

- Node.js
- MongoDB (running locally or a MongoDB Atlas connection string) under the MONGO_URI env
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   cd frontend
   npm install
   cd ..
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with:
   ```
   MONGO_URI=your_mongodb_connection_string
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

5. Start the front end server
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## API Endpoints

- `GET /api/players` - Get all players
- `PUT /api/players/:id` - Update a player's votes

## Project Structure

```
leaderboardFullStack/
├── frontend/          # React frontend
│   └── src/
│       └── components/
│           ├── Player.jsx
│           └── PlayersList.jsx
├── db/               # Database operations
│   └── myMongoDB.js
└── README.md
```

