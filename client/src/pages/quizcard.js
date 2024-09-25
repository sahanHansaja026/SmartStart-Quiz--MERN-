import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import "../css/quizcard.css"; // Import custom CSS for styling
import authService from "../services/authService"; // Import authService for user data

const QuizCard = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();
  const navigate = useNavigate(); // Use useNavigate

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await authService.getUserData();
        setUsername(userData.username);
        setEmail(userData.email);
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    };
    fetchUserData();
  }, []);

  // Fetch post data based on card ID
  useEffect(() => {
    axios
      .get(`http://localhost:9000/post/${id}`)
      .then((res) => {
        if (res.data.success) {
          setPost(res.data.post);
        }
      })
      .catch((error) => {
        console.error("Error fetching post details:", error);
      });
  }, [id]);

  // Function to handle quiz button click
  const handleQuizButtonClick = () => {
    if (post.card_id) {
      // Check if card_id exists
      navigate(`/quiz/${post.card_id}`); // Navigate to the quiz page with card_id
    } else {
      console.error("Card ID is not defined.");
    }
  };

  // Function to check if emails are equal
  const emailsMatch = () => {
    return email && post.email && email === post.email;
  };

  return (
    <div className="quiz-card">
      <div className="quiz-header"></div>
      <div className="instructions">
        <h2>Instructions</h2>
        <p>
          Prepare yourself! Carefully read each question and select the answer
          you believe is correct. You can only attempt the quiz once, so make it
          count!
        </p>
      </div>
      <div className="quiz-details">
        <button className="quiz-button" onClick={handleQuizButtonClick}>
          Attempt the Quiz
        </button>
      </div>
      {/* Conditionally display Modify link if emails match */}
      {emailsMatch() && (
        <Link to={`/curds/${post.card_id}`}>Modify (only for admin)</Link>
      )}
    </div>
  );
};

export default QuizCard;
