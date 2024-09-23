import React, { Component } from "react";
import axios from "axios";
import authService from "../services/authService"; // Import the auth service to get user data
import "../css/input.css";

class CreateCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      newPost: {
        title: "",
        summery: "",
        image: null,
      },
      userEmail: "",  // Store user email separately
    };
  }

  async componentDidMount() {
    await this.fetchUserData();  // Fetch user email
    this.retrievePosts();  // Fetch posts
  }

  async fetchUserData() {
    try {
      const userData = await authService.getUserData(); // Fetch user data
      this.setState({
        userEmail: userData.email,  // Store email in a separate state
      });
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  }

  retrievePosts() {
    axios
      .get("http://localhost:9000/posts") // Adjust your backend route if necessary
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

    const { title, summery, image } = this.state.newPost;
    if (!title || !summery || !image) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("email", this.state.userEmail);  // Add the email separately
    formData.append("title", title);
    formData.append("summery", summery);
    formData.append("image", image);

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
              title: "",
              summery: "",
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
              Add Summary about your Quiz:
              <br />
              <textarea
                type="text"
                name="summery"
                value={this.state.newPost.summery}
                onChange={this.handleChange}
                placeholder="Add Summary about quiz"
                required
              />
            </label>
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
