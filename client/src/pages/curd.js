import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../css/curd.css'; // Import your CSS file

const CurdsPage = () => {
  const { id } = useParams();
  const card_id = id;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/post/card/${card_id}`
        );

        if (response.data.success) {
          setPosts(response.data.posts);
        } else {
          setError("No posts found");
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

  const onDelete = (postId) => {
    axios.delete(`http://localhost:9000/post/delete/${postId}`)
      .then((res) => {
        if (res.data.message === "Post deleted successfully") {
          alert("Delete successful");
          setPosts(posts.filter(post => post.id !== postId)); // Update the state to remove the deleted post
        } else {
          alert("Error deleting post");
        }
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
        alert("Error deleting post");
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="curd">
      <h1>Curds Page</h1>
      <p>Your unique card ID is: {card_id}</p>
      <h2>Posts:</h2>
      {posts.length === 0 ? (
        <p>No posts found for this card ID.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Question</th>
              <th scope="col">Answer 1</th>
              <th scope="col">Answer 2</th>
              <th scope="col">Answer 3</th>
              <th scope="col">Answer 4</th>
              <th scope="col">Correct Answer</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={post.id}>
                <th scope="row">{index + 1}</th>
                <td>{post.question}</td>
                <td>{post.answer_1}</td>
                <td>{post.answer_2}</td>
                <td>{post.answer_3}</td>
                <td>{post.answer_4}</td>
                <td>{post.correct_answer}</td>
                <td>
                  <a className="btn btn-warning" href={`/edit/${post.id}`}>
                    <i className="fa fa-edit"></i>&nbsp;Edit
                  </a>
                  &nbsp;
                  <a className="btn btn-danger" href="#" onClick={() => onDelete(post.id)}>
                    <i className="fa fa-trash"></i>&nbsp;Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button className='btn btn-success'>
        <a href="/add" style={{ textDecoration: 'none', color: 'purple' }}>
          <i className="fa fa-plus"></i>&nbsp;Create New Post
        </a>
      </button>
    </div>
  );
};

export default CurdsPage;
