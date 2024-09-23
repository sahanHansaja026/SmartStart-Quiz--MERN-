import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import "../css/login.css";
import Upload from "../images/login.png";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // useNavigate replaces useHistory

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register({ username, email, password });
      navigate("/"); // use navigate to redirect the user
    } catch (error) {
      console.error("Registration failed", error);
    }
  };
  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="login">
      <div className="container">
        <div className="content1">
          <h1>Welcome</h1>
          <img src={Upload} alt="Example" />
        </div>
        <div className="content2">
          <div className="title">
            <button className="button" onClick={() => handleNavigate("/")}>
              Login
            </button>
            <button
              className="select"
              onClick={() => handleNavigate("/register")}
            >
              Register
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <label>
              User Name :-
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            <label>
              Email Address :-
              <br />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              Password :-
              <br />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <button className="submit" type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
