import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Add useNavigate
import axios from "axios";
import "../css/quiz.css";

const Quiz = () => {
  const { card_id } = useParams();
  const navigate = useNavigate(); // Initialize navigate to redirect user
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [results, setResults] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/post/card/${card_id}`
        );
        if (response.data.success) {
          setPosts(response.data.posts);
          setResults(new Array(response.data.posts.length).fill(null));
        }
      } catch (error) {
        console.error("Error fetching post details:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [card_id]);

  const handleNext = () => {
    if (answered) {
      if (currentIndex < posts.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setAnswered(false);
        setShowCorrectAnswer(false);
        setSelectedAnswer("");
      } else {
        // Calculate score and navigate to the score page
        const score = results.filter((result) => result === true).length;
        navigate(`/score/${card_id}`, { state: { score, total: posts.length } });
      }
    } else {
      const post = posts[currentIndex];
      const isCorrect = selectedAnswer === post.correct_answer;

      // Update the results array
      const updatedResults = [...results];
      updatedResults[currentIndex] = isCorrect;
      setResults(updatedResults);

      setAnswered(true);
      setShowCorrectAnswer(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setAnswered(false);
      setShowCorrectAnswer(false);
      setSelectedAnswer("");
    }
  };

  const handleAnswerChange = (e) => {
    setSelectedAnswer(e.target.value);
  };

  const handleQuestionClick = (index) => {
    setCurrentIndex(index);
    setAnswered(false);
    setShowCorrectAnswer(false);
    setSelectedAnswer("");
  };

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  if (error) {
    return <p className="error">Error: {error}</p>;
  }

  if (posts.length === 0) {
    return <p>No questions found for this card ID.</p>;
  }

  const post = posts[currentIndex];

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Quiz Page</h1>
      <p className="quiz-card-id">Card ID: <span>{card_id}</span></p>

      {/* Display clickable question numbers */}
      <div className="question-numbers">
        {posts.map((_, index) => (
          <button
            key={index}
            className={`question-number ${
              results[index] === true
                ? "correct"
                : results[index] === false
                ? "incorrect"
                : ""
            }`}
            onClick={() => handleQuestionClick(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <h2 className="quiz-subtitle">Post Details:</h2>
      <div className="quiz-question">
        <p>
          <b>Question:</b> {post.question}
        </p>
        <div className="quiz-answers">
          <label>
            <input
              type="radio"
              name="answer"
              value={post.answer_1}
              checked={selectedAnswer === post.answer_1}
              onChange={handleAnswerChange}
              disabled={answered}
            />
            {post.answer_1}
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="answer"
              value={post.answer_2}
              checked={selectedAnswer === post.answer_2}
              onChange={handleAnswerChange}
              disabled={answered}
            />
            {post.answer_2}
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="answer"
              value={post.answer_3}
              checked={selectedAnswer === post.answer_3}
              onChange={handleAnswerChange}
              disabled={answered}
            />
            {post.answer_3}
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="answer"
              value={post.answer_4}
              checked={selectedAnswer === post.answer_4}
              onChange={handleAnswerChange}
              disabled={answered}
            />
            {post.answer_4}
          </label>
        </div>

        {showCorrectAnswer && (
          <p className="correct-answer">
            Correct Answer: {post.correct_answer}
          </p>
        )}
      </div>

      <div className="navigation-buttons">
        <button
          className="previous-button"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          Previous
        </button>

        <button
          className="next-button"
          onClick={handleNext}
          disabled={!selectedAnswer && !answered}
        >
          {answered ? (currentIndex === posts.length - 1 ? "Finish" : "Next") : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
