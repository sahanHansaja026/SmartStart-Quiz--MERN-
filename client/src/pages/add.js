import React, { Component } from "react";
import axios from "axios";
import '../css/question.css'

export default class createpost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      newPost: { question: "", answer_1: "", answer_2: "", answer_3: "", answer_4: "", correct_answer: ""},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
  }

  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts() {
    axios
      .get("http://localhost:7500/profile")
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
        console.error("Error fetching posts: ", error);
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      newPost: {
        ...prevState.newPost,
        [name]: value,
      },
    }));
  }

  handleRadioChange(event) {
    this.setState({
      newPost: {
        ...this.state.newPost,
        correct_answer: event.target.value,
      },
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:9000/question/save", this.state.newPost)
      .then((res) => {
        if (res.data.success) {
          console.log("Post added successfully");
          this.setState({
            newPost: { question: "", answer_1: "", answer_2: "", answer_3: "", answer_4: "", correct_answer: ""},
          });
          this.retrievePosts();
        } else {
          console.error("Error adding post:", res.data.error);
        }
      })
      .catch((error) => {
        console.error("Error adding post:", error);
      });
  }
  

  render() {
    return (
      <div>
        <center>
          <div className="container1">
            <div className="content">
              <form onSubmit={this.handleSubmit}>
                <div className="title">Add Question Details</div>
                <br />
                <label>
                  Question Text :
                  <input
                    type="text"
                    name="question"
                    value={this.state.newPost.question}
                    onChange={this.handleChange}
                  />
                </label>
                <br />
                <label>
                  Answer 1 :
                  <input
                    type="text"
                    name="answer_1"
                    value={this.state.newPost.answer_1}
                    onChange={this.handleChange}
                  />
                </label>
                <br />
                <label>
                  Answer 2 :
                  <input
                    type="text"
                    name="answer_2"
                    value={this.state.newPost.answer_2}
                    onChange={this.handleChange}
                  />
                </label>
                <br />
                <label>
                  Answer 3 :
                  <input
                    type="text"
                    name="answer_3"
                    value={this.state.newPost.answer_3}
                    onChange={this.handleChange}
                  />
                </label>
                <br />
                <label>
                  Answer 4 :
                  <input
                    type="text"
                    name="answer_4"
                    value={this.state.newPost.answer_4}
                    onChange={this.handleChange}
                  />
                </label>
                <br />
                <label>Select the Correct Answer:</label>
                <div>
                  <input
                    type="radio"
                    name="correct_answer"
                    value={this.state.newPost.answer_1}
                    checked={this.state.newPost.correct_answer === this.state.newPost.answer_1}
                    onChange={this.handleRadioChange}
                  />
                  {this.state.newPost.answer_1}
                </div>
                <div>
                  <input
                    type="radio"
                    name="correct_answer"
                    value={this.state.newPost.answer_2}
                    checked={this.state.newPost.correct_answer === this.state.newPost.answer_2}
                    onChange={this.handleRadioChange}
                  />
                  {this.state.newPost.answer_2}
                </div>
                <div>
                  <input
                    type="radio"
                    name="correct_answer"
                    value={this.state.newPost.answer_3}
                    checked={this.state.newPost.correct_answer === this.state.newPost.answer_3}
                    onChange={this.handleRadioChange}
                  />
                  {this.state.newPost.answer_3}
                </div>
                <div>
                  <input
                    type="radio"
                    name="correct_answer"
                    value={this.state.newPost.answer_4}
                    checked={this.state.newPost.correct_answer === this.state.newPost.answer_4}
                    onChange={this.handleRadioChange}
                  />
                  {this.state.newPost.answer_4}
                </div>
                <br />
                <button type="submit">Store in the system</button>
              </form>
            </div>
          </div>
        </center>
      </div>
    );
  }
}
