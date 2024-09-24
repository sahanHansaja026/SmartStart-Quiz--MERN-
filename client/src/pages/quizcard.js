import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate

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
    <div className="movie">
      <h1>{post.movie}</h1>
      <div className="main_content">
        <div className="content">
          <table>
            <tbody>
              <tr>
                <td>
                  <b>Card Id:</b>
                </td>
                <td>{post.card_id}</td>
              </tr>
            </tbody>
          </table>
          <button onClick={handleQuizButtonClick}>Attempt the Quiz</button>
        </div>
      </div>
      <br />
    </div>
  );
};

export default QuizCard;
