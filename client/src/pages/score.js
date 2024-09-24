import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import authService from "../services/authService"; // Assuming authService contains the logic to get user data
import "../css/score.css";

const ScorePage = ({ score }) => {
  const { card_id } = useParams(); // Fetching the card ID from URL
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await authService.getUserData();
        setUsername(userData.username);
        setEmail(userData.email);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="score-page">
      <h2>Quiz Completed!</h2>
      <p>Card ID: {card_id}</p>
      <p>Your Score: {score} / 10</p> {/* Display the user's score */}
      <p>Username: {username}</p> {/* Display username */}
      <p>Your Email: {email}</p> {/* Display email */}
    </div>
  );
};

export default ScorePage;
