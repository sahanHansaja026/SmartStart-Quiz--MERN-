import React, { Component } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Import necessary hooks
import "../css/question.css";

// AddPage component
const AddPage = ({ setCardId }) => {
  const { id } = useParams();

  // Set the card ID
  React.useEffect(() => {
    setCardId(id); // Set the card ID in createPost state
  }, [id, setCardId]);

  return (
    <div>
      <h1>Add Page</h1>
      <p>Your unique post ID is: {id}</p>
    </div>
  );
};

// Create a wrapper component for AddPage
const AddPageWrapper = ({ setCardId }) => {
  return <AddPage setCardId={setCardId} />;
};

// Function to create a wrapper for the class component
const withNavigate = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();
    return <WrappedComponent {...props} navigate={navigate} />;
  };
};

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      newPost: {
        card_id: "",
        question: "",
        answer_1: "",
        answer_2: "",
        answer_3: "",
        answer_4: "",
        correct_answer: "",
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.setCardId = this.setCardId.bind(this);
    this.handleQuizButtonClick = this.handleQuizButtonClick.bind(this);
  }

  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts() {
    axios
      .get("http://localhost:7500/profile")
      .then((res) => {
        if (res.data.success) {
          this.setState({ posts: res.data.existingPosts });
          console.log("Posts retrieved successfully:", this.state.posts);
        } else {
          console.log("Error fetching posts", res.data.error);
        }
      })
      .catch((error) => {
        console.error("Error fetching posts: ", error);
      });
  }

  setCardId(id) {
    this.setState((prevState) => ({
      newPost: {
        ...prevState.newPost,
        card_id: id,
      },
    }));
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
            newPost: {
              card_id: "",
              question: "",
              answer_1: "",
              answer_2: "",
              answer_3: "",
              answer_4: "",
              correct_answer: "",
            },
          });
          window.location.reload();
        } else {
          console.error("Error adding post:", res.data.error);
        }
      })
      .catch((error) => {
        console.error("Error adding post:", error);
      });
  }

  handleQuizButtonClick() {
    const { newPost } = this.state;
    if (newPost.card_id) {
      this.props.navigate(`/curds/${newPost.card_id}`);
    } else {
      console.error("Card ID is not defined.");
    }
  }

  render() {
    return (
      <div className="show">
        <center>
          <div className="container1">
            <div className="content">
              <AddPageWrapper setCardId={this.setCardId} />
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
            <button className="quiz-button" onClick={this.handleQuizButtonClick}>
              Preview
            </button>
          </div>
        </center>
      </div>
    );
  }
}

// Wrap CreatePost with withNavigate to pass navigate as a prop
export default withNavigate(CreatePost);
