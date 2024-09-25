import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../css/edit.css";

const EditPost = () => {
  const [post, setPost] = useState({
    card_id: "",
    question: "",
    answer_1: "",
    answer_2: "",
    answer_3: "",
    answer_4: "",
    correct_answer: "",
  });

  const { id } = useParams();

  useEffect(() => {
    retrievePost();
  }, []);

  const retrievePost = () => {
    axios
      .get(`http://localhost:9000/question/${id}`)
      .then((res) => {
        if (res.data.success) {
          setPost(res.data.post);
        } else {
          console.log("Error fetching post:", res.data.error);
        }
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:9000/question/update/${id}`, post)
      .then((res) => {
        console.log(res.data);
        alert("Update successful");
      })
      .catch((error) => {
        console.error("Axios error:", error);
      });
  };

  return (
    <div className="edit-post-container">
      <h2 className="title">Update Question</h2>
      <form onSubmit={handleSubmit} className="edit-post-form">
        <div className="form-group">
        </div>
        <div className="form-group">
          <label>Question:</label>
          <textarea
            name="question"
            value={post.question}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Answer 1:</label>
          <input
            type="text"
            name="answer_1"
            value={post.answer_1}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Answer 2:</label>
          <input
            type="text"
            name="answer_2"
            value={post.answer_2}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Answer 3:</label>
          <input
            type="text"
            name="answer_3"
            value={post.answer_3}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Answer 4:</label>
          <input
            type="text"
            name="answer_4"
            value={post.answer_4}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Correct Answer:</label>
          <div>
            {[post.answer_1, post.answer_2, post.answer_3, post.answer_4].map((answer, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={`answer_${index + 1}`}
                  name="correct_answer"
                  value={answer}
                  checked={post.correct_answer === answer}
                  onChange={handleChange}
                />
                <label htmlFor={`answer_${index + 1}`} className="radio-label">
                  {answer}
                </label>
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="submit-button">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditPost;
