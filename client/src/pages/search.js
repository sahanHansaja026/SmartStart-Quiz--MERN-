import React, { Component } from "react";
import axios from "axios";
import "../css/searchbar.css";

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [], // Hold multiple posts that match the search query
      searchQuery: "",
      errorMessage: "",
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(event) {
    const searchQuery = event.target.value;
    this.setState({ searchQuery });

    if (searchQuery.length > 0) {
      axios
        .post("http://localhost:9000/search", { title: searchQuery })
        .then((res) => {
          if (res.data.success) {
            this.setState({ posts: res.data.existingPosts, errorMessage: "" });
          } else {
            this.setState({ errorMessage: res.data.error, posts: [] });
          }
        })
        .catch((error) => {
          console.error("Error searching for module or card:", error);
          this.setState({
            errorMessage: "Error. Unable to search for the module or card.",
            posts: [],
          });
        });
    } else {
      this.setState({ posts: [], errorMessage: "" }); // Clear results if search query is empty
    }
  }

  render() {
    const { posts, searchQuery, errorMessage } = this.state;

    return (
      <div>
        {/* Search Bar */}
        <form className="search-form">
          <input
            type="text"
            placeholder="Search Subject or Module Name..."
            value={searchQuery}
            onChange={this.handleSearchChange}
          />
        </form>
        {/* Display error message if search fails */}
        {errorMessage && <div className="error">{errorMessage}</div>}

        {/* Display the searched movies details */}
        <div className="card-container">
          {posts.map((post) => (
            <a href={`/post/${post._id}`} className="card" key={post._id}>
              <div className="card-image">
                <img
                  src={post.image ? require(`../uploads/${post.image}`) : ""}
                  alt={post.image}
                />
              </div>
              <div className="card-header">
                <h3>
                  {post.title} 
                </h3>
                <p>{post.summery}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  }
}
