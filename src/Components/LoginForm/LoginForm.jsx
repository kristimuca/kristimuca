import React, { useState } from "react";
import "./LoginForm.css";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../Assets/logo-transparent.png";

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleForgotClick = (e) => {
    e.preventDefault();
    navigate("/forgott");
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5076/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.token)
        localStorage.setItem("token", data.token);
        navigate("/logged");
      } else {
        console.error("Login failed.");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="container">
      <div className="logo-klip">
        <img src={logo} alt="KlipFit Logo" className="logo" />
      </div>

      <div className="wrapper">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Login</h1>

          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FaUser className="icon" />
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className="icon" />
          </div>

          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" onClick={handleForgotClick}>
              Reset password
            </a>
          </div>

          <button type="submit">Login</button>

          <div className="register-link">
            <p>
              Join the Community!{" "}
              <a href="#" onClick={handleRegisterClick}>
                Register
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
