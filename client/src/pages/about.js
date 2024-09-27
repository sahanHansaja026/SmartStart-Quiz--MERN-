import React, { Component } from "react";
import "../css/about.css";
import wellcome from "../images/Welcome.png";
import Goal from "../images/goal.png";
import Movies from "../images/movie.png";
import Community from "../images/community.png";
import Vison from "../images/vison.png";
import Mark from "../images/mark.png";
import heroimage from "../images/test.png";

export default class About extends Component {
  render() {
    return (
      <div className="about">
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
        <div className="box2">
          <div className="subbox1">
            <h2>Welcome to SmartStart Quiz!</h2>
            <p>
              SmartStart Quiz is your go-to platform for testing your knowledge
              and sharpening your skills. Whether you're looking to challenge
              yourself with fun quizzes or engage in competitive learning, this
              is the place for you. Get ready to expand your mind and enjoy an
              exciting quiz experience!
            </p>
          </div>
          <div className="subbox2">
            <img src={wellcome} alt="Background" />
          </div>
        </div>
        <br />
        <div className="box3">
          <div className="subbox2">
            <img src={Goal} alt="Background" />
          </div>
          <div className="subbox1">
            <h2>Our Mission</h2>
            <p>
              At SmartStart Quiz, our mission is to foster a love for learning
              by offering engaging and challenging quizzes. We aim to create a
              platform where users can test their knowledge, enhance their
              critical thinking skills, and enjoy the process of continuous
              learning. Whether for fun or education, we are committed to
              providing an enjoyable and rewarding quiz experience for everyone.
            </p>
          </div>
        </div>
        <br />
        <div className="box3">
          <div className="subbox1">
            <h2>What We Offer</h2>
            <ul class="a">
              <li>
                <b>Engaging Quizzes:-</b>
                <i>
                  We provide a wide range of quizzes designed to challenge your
                  knowledge and boost your learning in a fun and interactive
                  way.
                </i>
              </li>
              <br />
              <li>
                <b>Custom Challenges:-</b>
                You can create personalized quiz challenges and invite friends
                to compete, making learning a social and exciting experience.
              </li>
              <br />
              <li>
                <b>Community Interaction:-</b>
                Join a vibrant community of quiz enthusiasts, share your scores,
                and engage in friendly competition on our leaderboards.
              </li>
            </ul>
          </div>
          <div className="subbox3">
            <img src={Movies} alt="Background" />
          </div>
        </div>
        <br />
        <center>
          <div className="add_sence">Google Ads</div>
        </center>
        <br />
        <div className="box2">
          <div className="subbox1">
            <h2>Join Our Community</h2>
            <p>
              Become a part of the SmartStart Quiz community and connect with
              fellow quiz enthusiasts! By joining, you'll unlock access to
              exciting quizzes, leaderboards, and exclusive challenges. Share
              your achievements, compete with friends, and be a part of a
              growing network of learners and thinkers. Sign up today and take
              your quiz experience to the next level!
            </p>
          </div>
          <div className="subbox2">
            <img src={Community} alt="Background" />
          </div>
        </div>
        <br />
        <div className="box3">
          <div className="subbox4">
            <img src={Vison} alt="Background" />
          </div>
          <div className="subbox1">
            <h2>Our Vision</h2>
            <p>
              Our vision at SmartStart Quiz is to become the leading platform
              for interactive learning and knowledge-sharing. We aim to inspire
              a global community of curious minds, fostering a passion for
              education through engaging and thought-provoking quizzes. We
              envision a world where learning is fun, accessible, and empowering
              for everyone.
            </p>
          </div>
        </div>
        <br />
        <center>
          <div className="mark">
            <img src={Mark} alt="Background" />
          </div>
          <div className="mark">
            <p>
              SmartStart Quiz is proudly powered by MARK Technologies, ensuring
              a seamless and reliable experience for all our users
            </p>
          </div>
        </center>
        <center>
          <div className="add_sence">Google Ads</div>
        </center>
        <br />
      </div>
    );
  }
}
