# Zing Wing

Zing Wing is a Project 1 web application prototype for my mobile CSC 457 class, it is a gamified productivity platform. It uses a simple Node.js and Express backend with in-memory mission CRUD, plus a React frontend built with Vite, React Router, Redux Toolkit, and plain CSS.

## Project Structure

- `backend/` contains the Express API and starter in-memory mission data.
- `frontend/` contains the React single-page application.

## Setup Instructions

### Backend

1. Open a terminal in `backend/`
2. Run `npm install`
3. Run `node server.js`

The backend will start on `http://localhost:5000`.

### Frontend

1. Open a second terminal in `frontend/`
2. Run `npm install`
3. Run `npm run dev`

The frontend will start on Vite's local development server.

## Main Features

- Full CRUD for `missions`
- Home dashboard with XP, level, rank, avatar preview, AI mission suggestions, and leaderboard preview
- Mission list, details, add, edit, and delete pages
- Contact form with controlled inputs and validation
- React Router navigation
- Redux Toolkit state management
- Plain CSS styling with a dark neon productivity theme

## Assumptions

- Data is stored in memory only and resets whenever the backend server restarts.
- Redux Toolkit is used to keep Redux code simple and beginner-friendly.
- Mock AI suggestions and leaderboard data are frontend-only display content.
- No authentication, database, or external AI integration is included.
