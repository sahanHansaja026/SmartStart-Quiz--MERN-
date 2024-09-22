import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/login.css";

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
      navigate("/add");
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
      <div className="contents">
        <h2
          className="title login-title"
          onClick={() => handleNavigate("/login")}
        >
          Login
        </h2>
        <h2
          className="title signup-title"
          onClick={() => handleNavigate("/register")}
        >
          Sign Up
        </h2>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
