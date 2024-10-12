import React, { Component } from "react";
import axios from "axios";
import "../css/home.css";
import { Link } from "react-router-dom";
import heroimage from "../images/test.png";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      currentPage: 1,
      totalPages: 1,
      postsPerPage: 3,
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts(page = 1) {
    const { postsPerPage } = this.state;
    axios
      .get(`http://localhost:9000/posts?page=${page}&limit=${postsPerPage}`)
      .then((res) => {
        if (res.data.success) {
          this.setState({
            posts: res.data.existingPosts,
            currentPage: page,
            totalPages: Math.ceil(res.data.totalPosts / postsPerPage),
          });
        } else {
          console.error("Error fetching posts:", res.data.error);
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }

  renderPagination() {
    const { currentPage, totalPages } = this.state;
    const pages = [];
    const maxVisiblePages = 3; // Number of page buttons to show on each side of the current page

    // Display first page
    if (currentPage > 1) {
      pages.push(
        <button
          key={1}
          className={`pagination-button ${1 === currentPage ? "active" : ""}`}
          onClick={() => this.retrievePosts(1)}
        >
          1
        </button>
      );
    }

    // Show ellipses if there are pages between the first and current page
    if (currentPage > maxVisiblePages + 1) {
      pages.push(<span key="left-ellipsis">...</span>);
    }

    // Display pages around the current page
    for (
      let i = Math.max(2, currentPage - maxVisiblePages);
      i <= Math.min(totalPages - 1, currentPage + maxVisiblePages);
      i++
    ) {
      pages.push(
        <button
          key={i}
          className={`pagination-button ${i === currentPage ? "active" : ""}`}
          onClick={() => this.retrievePosts(i)}
        >
          {i}
        </button>
      );
    }

    // Show ellipses if there are pages between the current and last page
    if (currentPage < totalPages - maxVisiblePages) {
      pages.push(<span key="right-ellipsis">...</span>);
    }

    // Display last page
    if (totalPages > 1) {
      pages.push(
        <button
          key={totalPages}
          className={`pagination-button ${totalPages === currentPage ? "active" : ""}`}
          onClick={() => this.retrievePosts(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return (
      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={() => this.retrievePosts(currentPage - 1)}>
            Previous
          </button>
        )}
        {pages}
        {currentPage < totalPages && (
          <button onClick={() => this.retrievePosts(currentPage + 1)}>
            Next
          </button>
        )}
      </div>
    );
  }

  // Helper function to truncate the summary
  truncateSummary(summary, maxLength = 100) {
    if (summary.length > maxLength) {
      return `${summary.substring(0, maxLength)}...`;
    }
    return summary;
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="home">
        <div className="hero">
          <div className="herotext">
            <h1>Welcome</h1>
            <h2>SmartStart Quiz</h2>
            <h4>"Test Your Wits, Challenge Your Mind!"</h4>
          </div>
          <div className="heroimage">
            <img src={heroimage} alt="Example" />
          </div>
        </div>
        <br />
        <center>
          <button className="box1">
            <Link to="/create">
              <font color="white">
                <h1>Create Your Quiz Here</h1>
              </font>
            </Link>
          </button>
        </center>
        <br />
        <div className="card-container">
          {posts
            .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort posts by date in descending order
            .map((post) => (
              <a href={`/post/${post._id}`} className="card" key={post._id}>
                <div className="card-image">
                <img
                    src={
                      post.image
                        ? `http://localhost:9000/Uploads/${post.image}`
                        : ""
                    }
                    alt={post.image ? post.image : "No Image"}
                  />
                </div>
                <div className="card-header">
                  <h3>{post.title}</h3>
                  <p>{this.truncateSummary(post.summery, 100)}</p> {/* Use the truncate function here */}
                </div>
              </a>
            ))}
        </div>
        {this.renderPagination()}
        <br />
      </div>
    );
  }
}
