# SmartStart Quiz

![Landing page Screenshot](https://github.com/sahan026/images/blob/main/landing.png)
![home page Screenshot](https://github.com/sahan026/images/blob/main/quiz%20homepage%201.png)
![question page Screenshot](https://github.com/sahan026/images/blob/main/quesions%20page.png)

   
SmartStart Quiz is an interactive MERN stack-based platform where users can create quizzes, take quizzes, and track their performance via a personalized dashboard. The platform is designed to allow anyone to participate, and it offers a seamless experience for both quiz creation and participation.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Front-End Dependencies](#front-end-dependencies)

## Features

- **User Authentication**: Secure login and registration using JWT.
- **Profile Update**: Users can update their profile information, including avatars.
  ![Profile Update Screenshot](https://github.com/sahan026/images/blob/main/quiz%20profile%20update.png) <!-- Add a screenshot of the profile update feature -->
- **Quiz Creation**: Any user can create new quizzes, making the platform community-driven.
  ![Create Quiz Screenshot](https://github.com/sahan026/images/blob/main/create%20quiz.png) <!-- Add a screenshot of the quiz creation page -->
- **Take Quizzes**: Users can take any quiz and receive immediate feedback.
  ![Take Quiz Screenshot](https://github.com/sahan026/images/blob/main/attemp%20quiz.png) <!-- Add a screenshot of the quiz-taking page -->
- **Dashboard**: Each user has a personalized dashboard to track their quiz history and performance.
  ![Dashboard Screenshot](https://github.com/sahan026/images/blob/main/dashboard.png) <!-- Add a screenshot of the dashboard -->
- **Responsive Design**: Optimized for mobile and desktop devices.

## Technologies Used

- **Front-End**: 
  - React (with `react-router-dom`)
  - Chart.js for data visualization in the dashboard
- **Back-End**: 
  - Node.js with Express.js
  - MongoDB (via Mongoose)
  - JWT for user authentication
  - Multer & Multer-GridFS for image and file handling
- **Other Libraries**:
  - bcrypt for password hashing
  - axios for making API calls
  - concurrently for running server and client simultaneously

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/SmartStart-Quiz.git
   ```

2. Navigate to the project directory:
   ```bash
   cd SmartStart-Quiz
   ```

3. Install the dependencies for both the client and server:
   ```bash
   npm install
   ```

4. Set up the environment variables. Create a `.env` file in the root directory and add the following:
   ```env
   MONGO_URI=your-mongo-db-uri
   JWT_SECRET=your-jwt-secret
   PORT=5000
   ```

5. Run the application (both server and client concurrently):
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`.


## API Routes

### Auth Routes

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Login and receive a token.

### Quiz Routes

- `GET /api/quizzes`: Fetch all quizzes.
- `GET /api/quizzes/:id`: Fetch a specific quiz by ID.
- `POST /api/quizzes`: Create a new quiz (any user).
- `POST /api/quizzes/:id/attempt`: Submit quiz answers and receive a score.

### User Routes

- `GET /api/users/me`: Fetch the logged-in user's details.
- `PUT /api/users/me`: Update the logged-in user's profile.

## Front-End Dependencies

```json
"dependencies": {
  "@testing-library/jest-dom": "^5.17.0",
  "@testing-library/react": "^13.4.0",
  "@testing-library/user-event": "^13.5.0",
  "axios": "^1.7.7",
  "chart.js": "^4.4.4",
  "react": "^18.3.1",
  "react-chartjs-2": "^5.2.0",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.26.2",
  "react-scripts": "5.0.1",
  "router-dom": "^2.2.11",
  "web-vitals": "^2.1.4"
}
```

