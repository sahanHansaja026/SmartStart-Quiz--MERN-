import React, { Component } from "react";
import axios from "axios";
import "../css/input.css";

class CreateCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      newPost: {
        email: "",
        title: "",
        image: null,
      },
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts() {
    axios
      .get("http://localhost:9000/posts") // Ensure this matches your backend route
      .then((res) => {
        if (res.data.success) {
          this.setState({
            posts: res.data.existingPosts,
          });
          console.log("Posts retrieved successfully:", this.state.posts);
        } else {
          console.error("Error fetching posts:", res.data.error);
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      newPost: {
        ...prevState.newPost,
        [name]: value,
      },
    }));
  };

  handleImageChange = (event) => {
    this.setState({
      newPost: {
        ...this.state.newPost,
        image: event.target.files[0],
      },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { email, title, image } = this.state.newPost;
    if (!email || !title || !image) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    for (let key in this.state.newPost) {
      formData.append(key, this.state.newPost[key]);
    }

    axios
      .post("http://localhost:9000/post/save", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.success) {
          console.log("Post added successfully");
          this.setState({
            newPost: {
              email: "",
              title: "",
              image: null,
            },
          });
          this.retrievePosts();
        } else {
          console.error("Error adding post:", res.data.error);
        }
      })
      .catch((error) => {
        console.error("Error adding post:", error);
      });
  };

  render() {
    return (
      <div className="input_sub">
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="box">
              <label>
                Email:
                <br />
                <input
                  type="email"
                  name="email"
                  value={this.state.newPost.email}
                  onChange={this.handleChange}
                  required
                />
              </label>
              <br />
              <label>
                Title:
                <br />
                <input
                  type="text"
                  name="title"
                  value={this.state.newPost.title}
                  onChange={this.handleChange}
                  required
                />
              </label>
            </div>
            <br />
            <label>
              Image:
              <br />
              <input
                type="file"
                name="image"
                accept=".png, .jpg, .jpeg"
                onChange={this.handleImageChange}
                required
              />
            </label>
            <br />
            <button type="submit">Store in the System</button>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateCard;
