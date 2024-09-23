import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function PostDetails() {
  const { id } = useParams(); // Fetch the post ID from URL
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:9000/posts/${id}`) // Fetch post by _id
      .then((res) => {
        if (res.data.success) {
          setPost(res.data.post);
        } else {
          console.error("Failed to fetch post details:", res.data.error);
        }
      })
      .catch((error) => {
        console.error("Error fetching post details:", error);
      });
  }, [id]);

  return (
    <div>
      {post ? (
        <div>
          <h2>{post.title}</h2>
          <p>{post.summery}</p>
          <img src={post.imageUrl} alt={post.title} />
        </div>
      ) : (
        <p>Loading post details...</p>
      )}
    </div>
  );
}

export default PostDetails;
