import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/quiz.css";

const Quiz = () => {
  const { card_id } = useParams();
  const navigate = useNavigate();
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
        const response = await axios.get(`http://localhost:9000/post/card/${card_id}`);
        if (response.data.success) {
          setPosts(response.data.posts);
          setResults(new Array(response.data.posts.length).fill(null));
        } else {
          setError("Failed to load quiz questions.");
        }
      } catch (error) {
        setError("Error fetching quiz data. Please try again later.");
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
        resetQuestionState();
      } else {
        const score = results.filter((result) => result === true).length;
        navigate(`/score/${card_id}`, { state: { score, total: posts.length } });
      }
    } else {
      const post = posts[currentIndex];
      const isCorrect = selectedAnswer === post.correct_answer;

      // Update results
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
      resetQuestionState();
    }
  };

  const resetQuestionState = () => {
    setAnswered(false);
    setShowCorrectAnswer(false);
    setSelectedAnswer("");
  };

  const handleAnswerChange = (e) => {
    setSelectedAnswer(e.target.value);
  };

  const handleQuestionClick = (index) => {
    setCurrentIndex(index);
    resetQuestionState();
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

      <div className="question-numbers">
        {posts.map((_, index) => (
          <button
            key={index}
            className={`question-number ${
              results[index] === true ? "correct" : results[index] === false ? "incorrect" : ""
            }`}
            onClick={() => handleQuestionClick(index)}
          >
            {index + 1}
          </button>
        ))}
      </div> 
      <div className="quiz-question">
        <h2><b>{post.question}</b></h2>
        <div className="quiz-answers">
          {[post.answer_1, post.answer_2, post.answer_3, post.answer_4].map((answer, index) => (
            <label key={index}>
              <input
                type="radio"
                name="answer"
                value={answer}
                checked={selectedAnswer === answer}
                onChange={handleAnswerChange}
                disabled={answered}
              />
              {answer}
            </label>
          ))}
        </div>

        {showCorrectAnswer && (
          <p className="correct-answer">
            Correct Answer: {post.correct_answer}
          </p>
        )}
      </div>

      <div className="navigation-buttons">
        <button className="previous-button" onClick={handlePrevious} disabled={currentIndex === 0}>
          Previous
        </button>

        <button className="next-button" onClick={handleNext} disabled={!selectedAnswer && !answered}>
          {answered ? (currentIndex === posts.length - 1 ? "Finish" : "Next") : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
