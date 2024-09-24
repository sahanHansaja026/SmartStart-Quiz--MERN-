import React, { Component } from "react";
import axios from "axios";
import { withNavigation } from "../utils/withNavigation"; 
import authService from "../services/authService";
import { v4 as uuidv4 } from 'uuid';
import "../css/input.css";

class CreateCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      newPost: {
        id: "",
        title: "",
        summery: "",
        card_id: "",  // This will be set in handleSubmit
        image: null,
      },
      userEmail: "",
      errorMessage: "",
      imagePreview: null,
    };
  }

  async componentDidMount() {
    await this.fetchUserData();
    this.retrievePosts();
  }

  async fetchUserData() {
    try {
      const userData = await authService.getUserData();
      this.setState({ userEmail: userData.email });
    } catch (error) {
      console.error("Failed to fetch user data", error);
      this.setState({ errorMessage: "Failed to fetch user data." });
    }
  }

  retrievePosts() {
    axios
      .get("http://localhost:9000/posts")
      .then((res) => {
        if (res.data.success) {
          this.setState({ posts: res.data.existingPosts });
          console.log("Posts retrieved successfully:", this.state.posts);
        } else {
          console.error("Error fetching posts:", res.data.error);
          this.setState({ errorMessage: res.data.error });
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        this.setState({ errorMessage: "Error fetching posts." });
      });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      newPost: {
        ...prevState.newPost,
        [name]: value,
      },
      errorMessage: "",
    }));
  };

  handleImageChange = (event) => {
    const file = event.target.files[0];
    this.setState({
      newPost: {
        ...this.state.newPost,
        image: file,
      },
      imagePreview: URL.createObjectURL(file),
      errorMessage: "",
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, summery, image } = this.state.newPost;
    if (!title || !summery || !image) {
      alert("Please fill in all required fields.");
      return;
    }

    const newPostId = uuidv4(); // Generate a new unique ID
    const formData = new FormData();
    formData.append("id", newPostId);
    formData.append("card_id", newPostId); // Set card_id to the generated id
    formData.append("email", this.state.userEmail);
    formData.append("title", title);
    formData.append("summery", summery);
    formData.append("image", image);

    axios
      .post("http://localhost:9000/posts/save", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.success) {
          console.log("Post added successfully");
          this.setState({
            newPost: { id: "", title: "", summery: "", image: null },
            imagePreview: null,
          });
          this.retrievePosts();
          this.props.navigate(`/add/${newPostId}`);
        } else {
          console.error("Error adding post:", res.data.error);
          this.setState({ errorMessage: res.data.error });
        }
      })
      .catch((error) => {
        console.error("Error adding post:", error);
        this.setState({ errorMessage: "Error adding post." });
      });
  };

  render() {
    return (
      <div className="input_sub">
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            {this.state.errorMessage && (
              <div className="error-message">{this.state.errorMessage}</div>
            )}
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
            {this.state.imagePreview && (
              <img
                src={this.state.imagePreview}
                alt="Image Preview"
                style={{ width: "100px", height: "auto" }}
              />
            )}
            <br />
            <button type="submit">Store in the System</button>
          </form>
        </div>
      </div>
    );
  }
}

export default withNavigation(CreateCard);
