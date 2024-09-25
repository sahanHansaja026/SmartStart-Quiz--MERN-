import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../css/shows.css";

const QuestionDetails = () => {
    const [post, setPost] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:9000/question/${id}`)
            .then((res) => {
                if (res.data.success) {
                    setPost(res.data.post);
                }
            })
            .catch(error => {
                console.error('Error fetching post details:', error);
            });
    }, [id]);

    return (
        <div className="question-details">
            <h1 className="title">{post.name}</h1>
            <hr />
            <div className='content'>
                <table className='details-table'>
                    <tbody>
                        <tr>
                            <td><b>Question</b></td>
                            <td>{post.question}</td>
                        </tr>
                        <tr>
                            <td><b>Answer 1</b></td>
                            <td>{post.answer_1}</td>
                        </tr>
                        <tr>
                            <td><b>Answer 2</b></td>
                            <td>{post.answer_2}</td>
                        </tr>
                        <tr>
                            <td><b>Answer 3</b></td>
                            <td>{post.answer_3}</td>
                        </tr>
                        <tr>
                            <td><b>Answer 4</b></td>
                            <td>{post.answer_4}</td>
                        </tr>
                    </tbody>
                </table>
                {/* Correct Answer Box */}
                <div className="correct-answer-box">
                    <p><b>Correct Answer:</b> {post.correct_answer}</p>
                </div>
            </div>
        </div>
    );
};

export default QuestionDetails;
