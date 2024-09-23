import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import Upload from "../images/login.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to the login endpoint
      const response = await axios.post(
        "http://localhost:9000/api/auth/login",
        {
          email,
          password,
        }
      );

      // Store the token in local storage
      localStorage.setItem("token", response.data.token);

      // Navigate to the home page upon successful login
      navigate("/home");
    } catch (error) {
      console.error("Login failed", error);
      if (error.response) {
        alert(`Login failed: ${error.response.data.error}`);
      } else {
        alert("Login failed: Network error or server not reachable");
      }
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
            <button className="select" onClick={() => handleNavigate("/")}>Login</button>
            <button
              className="button"
              onClick={() => handleNavigate("/register")}
            >
              Register
            </button>
          </div>
          <form onSubmit={handleSubmit}>
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
            <button className="submit" type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
