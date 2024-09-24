import React, { Component } from "react";
import axios from "axios";
import authService from '../services/authService';
import "../css/profile.css";

const importAll = (r) => {
  let images = {};
  r.keys().forEach((item) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
};

const images = importAll(require.context('../profile', false, /\.(png|jpe?g|svg)$/));

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
        imageUrl: "",
      },
      existingPost: null,
    };

    this.fileInputRef = React.createRef(); // Create a ref for the file input
  }

  componentDidMount() {
    this.retrievePosts();
    this.fetchUserData();
  }

  retrievePosts() {
    axios
      .get("http://localhost:9000/profile")
      .then((res) => {
        if (res.data.success) {
          this.setState({ posts: res.data.existingPosts });
          console.log("Posts retrieved successfully:", this.state.posts);
        } else {
          console.log("Error fetching posts", res.data.error);
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error.response ? error.response.data : error.message);
      });
  }

  fetchUserData = async () => {
    try {
      const userData = await authService.getUserData();
      this.setState((prevState) => ({
        newPost: {
          ...prevState.newPost,
          email: userData.email,
        },
      }));
      this.fetchExistingProfile(userData.email);
    } catch (error) {
      console.error('Failed to fetch user data', error);
    }
  };

  fetchExistingProfile = async (email) => {
    try {
      const res = await axios.get(`http://localhost:9000/profiles?email=${email}`);
      if (res.data.success) {
        const userProfile = res.data.userProfile;
        this.setState({
          existingPost: userProfile,
          newPost: {
            ...this.state.newPost,
            ...userProfile,
            imageUrl: userProfile.image ? images[userProfile.image] : "",
          },
        });
      }
    } catch (error) {
      console.error("Error fetching existing profile:", error.response ? error.response.data : error.message);
    }
  };

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
        imageUrl: URL.createObjectURL(event.target.files[0]),
      },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (let key in this.state.newPost) {
      formData.append(key, this.state.newPost[key]);
    }

    const { first_name, last_name, DOB, email, phone, job, about } = this.state.newPost;

    if (!first_name || !last_name || !DOB || !job || !about || !email || !phone) {
      alert("Please fill in all required fields.");
      return;
    }

    const request = this.state.existingPost
      ? axios.put("http://localhost:9000/profile/update/email", formData)
      : axios.post("http://localhost:9000/profile/save", formData);

    request
      .then((res) => {
        if (res.data.success) {
          console.log(this.state.existingPost ? "Post updated successfully" : "Post added successfully");
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
              imageUrl: "",
            },
            existingPost: null,
          });
          this.retrievePosts();
        } else {
          console.error("Error processing request:", res.data.error);
        }
      })
      .catch((error) => {
        console.error("Error processing request:", error.response ? error.response.data : error.message);
      });
  };

  // New function to handle image click
  handleImageClick = () => {
    this.fileInputRef.current.click(); // Trigger the file input when the image is clicked
  };

  render() {
    return (
      <div className="profile-container">
        <div className="profile-header">
          <h1>Profile</h1>
        </div>
        <div className="profile-content">
          <div className="profile-picture" onClick={this.handleImageClick}>
            {this.state.newPost.imageUrl ? (
              <img src={this.state.newPost.imageUrl} alt="Profile" />
            ) : (
              <div className="default-profile-picture">No Image</div>
            )}
          </div>
          <form onSubmit={this.handleSubmit} className="profile-form">
            <div className="form-group">
              <label>First Name:</label>
              <input
                type="text"
                name="first_name"
                value={this.state.newPost.first_name}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input
                type="text"
                name="last_name"
                value={this.state.newPost.last_name}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <span>{this.state.newPost.email}</span>
            </div>
            <div className="form-group">
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={this.state.newPost.phone}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label>DOB:</label>
              <input
                type="date"
                name="DOB"
                value={this.state.newPost.DOB}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label>Job Category:</label>
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
            </div>
            <div className="form-group">
              <label>About Yourself:</label>
              <textarea
                name="about"
                value={this.state.newPost.about}
                onChange={this.handleChange}
                placeholder="Write something"
              />
            </div>
            <div className="form-group">
              <label></label>
              <input
                type="file"
                name="image"
                accept=".png, .jpg, .jpeg"
                onChange={this.handleImageChange}
                ref={this.fileInputRef} // Reference the file input
                style={{ display: 'none' }} // Hide the input element
              />
            </div>
            <button type="submit">
              {this.state.existingPost ? "Update" : "Create"} Profile
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Profile;
