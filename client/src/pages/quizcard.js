import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import "../css/quizcard.css"; // Import custom CSS for styling

const QuizCard = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();
  const navigate = useNavigate(); // Use useNavigate

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

  // Function to handle button click
  const handleQuizButtonClick = () => {
    if (post.card_id) { // Check if card_id exists
      navigate(`/quiz/${post.card_id}`); // Navigate to the quiz page with card_id
    } else {
      console.error("Card ID is not defined.");
    }
  };

  return (
    <div className="quiz-card">
      <div className="quiz-header">
      </div>
      <div className="instructions">
        <h2>Instructions</h2>
        <p>
          Prepare yourself! Carefully read each question and select the answer you believe is correct. 
          You can only attempt the quiz once, so make it count!
        </p>
      </div>
      <div className="quiz-details">
        <button className="quiz-button" onClick={handleQuizButtonClick}>
          Attempt the Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizCard;
