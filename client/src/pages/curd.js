import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../css/curd.css"; // Import your CSS file

const CurdsPage = () => {
  const { id } = useParams(); // This 'id' will be the card_id
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
    axios
      .delete(`http://localhost:9000/post/delete/${postId}`)
      .then((res) => {
        if (res.data.message === "Post deleted successfully") {
          alert("Delete successful");
          setPosts(posts.filter((post) => post._id !== postId)); // Update the state to remove the deleted post
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
      <center>
        <h1>Question Management Board</h1>
      </center>
      {posts.length === 0 ? (
        <p>No posts found for this card ID.</p>
      ) : (
        <center>
          <table>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Question</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => (
                <tr key={post._id}>
                  {" "}
                  {/* Use _id as the key */}
                  <th scope="row">{index + 1}</th>
                  <td>
                    {" "}
                    <a
                      href={`/getquestion/${post._id}`}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      {post.question}
                    </a>
                  </td>
                  <td>
                    <Link className="btn btn-warning" to={`/edit/${post._id}`}>
                      <i className="fa fa-edit"></i>&nbsp;Edit
                    </Link>
                    &nbsp;
                    <a
                      className="btn btn-danger"
                      href="#"
                      onClick={() => onDelete(post._id)} // Use _id for deletion
                    >
                      <i className="fa fa-trash"></i>&nbsp;Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </center>
      )}
    </div>
  );
};

export default CurdsPage;
