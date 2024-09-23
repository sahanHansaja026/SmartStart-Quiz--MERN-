import React, { Component } from "react";
import axios from "axios";
import "../css/profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      newPost: {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        DOB: "",
        job: "",
        about: "",
        image: null,
      },
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts() {
    axios
      .get("http://localhost:9000/profile")
      .then((res) => {
        if (res.data.success) {
          this.setState({
            posts: res.data.existingPosts,
          });
          console.log("Posts retrieved successfully:", this.state.posts);
        } else {
          console.log("Error fetching posts", res.data.error);
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

    const formData = new FormData();
    for (let key in this.state.newPost) {
      formData.append(key, this.state.newPost[key]);
    }

    const { first_name, last_name, DOB, email, phone, image, about, job } =
      this.state.newPost;

    if (
      !first_name ||
      !last_name ||
      !DOB ||
      !job ||
      !about ||
      !email ||
      !phone ||
      !image
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    axios
      .post("http://localhost:9000/profile/save", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.success) {
          console.log("Post added successfully");
          this.setState({
            newPost: {
              first_name: "",
              last_name: "",
              email: "",
              phone: "",
              DOB: "",
              job: "",
              about: "",
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
                First Name:
                <br />
                <input
                  type="text"
                  name="first_name"
                  value={this.state.newPost.first_name}
                  onChange={this.handleChange}
                />
              </label>
              <br />
              <label>
                Last Name:
                <br />
                <input
                  type="text"
                  name="last_name"
                  value={this.state.newPost.last_name}
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <br />
            <div className="box">
              <label>
                Email:
                <br />
                <input
                  type="email"
                  name="email"
                  value={this.state.newPost.email}
                  onChange={this.handleChange}
                />
              </label>
              <br />
              <label>
                Phone:
                <br />
                <input
                  type="text"
                  name="phone"
                  value={this.state.newPost.phone}
                  onChange={this.handleChange}
                />
              </label>
              <br />
            </div>
            <br />
            <label>
              DOB:
              <br />
              <input
                type="date"
                name="DOB"
                value={this.state.newPost.DOB}
                onChange={this.handleChange}
              />
            </label>
            <br />
            <br />
            <label>
              Job Category:
              <br />
              <select
                name="job"
                value={this.state.newPost.job}
                onChange={this.handleChange}
              >
                <option value="">Select a category</option>
                <option value="Teacher">Teacher</option>
                <option value="Student">Student</option>
                <option value="Lecturer">Lecturer</option>
                <option value="Other">Other</option>
              </select>
            </label>

            <br />
            <br />
            <label>
              About Yourself:
              <br />
              <textarea
                name="about"
                value={this.state.newPost.about}
                onChange={this.handleChange}
                placeholder="Write something"
              />
            </label>
            <br />
            <br />
            <label>
              Add Your Profile Picture:
              <br />
              <input
                type="file"
                name="image"
                accept=".png, .jpg, .jpeg"
                onChange={this.handleImageChange}
              />
            </label>
            <br />
            <br />
            <button type="submit">Store in the System</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Profile;
