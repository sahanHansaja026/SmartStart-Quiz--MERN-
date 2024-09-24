import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Import axios for making API calls
import "../css/quiz.css"; // Import custom styles

const Quiz = () => {
  const { card_id } = useParams(); // Use useParams to get card_id
  const [posts, setPosts] = useState([]); // State to hold an array of post data
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle error
  const [currentIndex, setCurrentIndex] = useState(0); // State to manage the current index

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/post/card/${card_id}` // Fetch posts using card_id
        );
        if (response.data.success) {
          setPosts(response.data.posts); // Set posts data in state
        }
      } catch (error) {
        console.error("Error fetching post details:", error);
        setError(error.message); // Set error message in state
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchPosts(); // Call the function to fetch posts
  }, [card_id]); // Dependency on card_id

  const handleNext = () => {
    if (currentIndex < posts.length - 1) {
      setCurrentIndex(currentIndex + 1); // Move to the next post
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1); // Move to the previous post
    }
  };

  if (loading) {
    return <p className="loading">Loading...</p>; // Display loading message
  }

  if (error) {
    return <p className="error">Error: {error}</p>; // Display error message
  }

  // Check if there are any posts to display
  if (posts.length === 0) {
    return <p>No questions found for this card ID.</p>;
  }

  const post = posts[currentIndex]; // Get the current post based on the index

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Quiz Page</h1>
      <p className="quiz-card-id">Card ID: <span>{card_id}</span></p>
      <h2 className="quiz-subtitle">Post Details:</h2>
      <div className="quiz-question">
        <p>
          <b>Question:</b> {post.question}
        </p>
        <div className="quiz-answers">
          <p><b>Answer 1:</b> {post.answer_1}</p>
          <p><b>Answer 2:</b> {post.answer_2}</p>
          <p><b>Answer 3:</b> {post.answer_3}</p>
          <p><b>Answer 4:</b> {post.answer_4}</p>
        </div>
      </div>
      <div className="navigation-buttons">
        <button 
          className="previous-button"
          onClick={handlePrevious}
          disabled={currentIndex === 0} // Disable if it's the first post
        >
          Previous
        </button>
        <button 
          className="next-button"
          onClick={handleNext}
          disabled={currentIndex >= posts.length - 1} // Disable if it's the last post
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Quiz;
