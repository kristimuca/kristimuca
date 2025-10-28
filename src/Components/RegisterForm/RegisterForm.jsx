import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { TfiEmail } from "react-icons/tfi";
import { LiaWeightSolid } from "react-icons/lia";
import logo from "../Assets/logo-transparent.png";

function RegisterForm() {
  // State for username and password (you can add others if needed)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5076/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      if (response.ok) {
        navigate("/");
      } else {
        console.error("Registration failed.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="container">
      <div className="logo-klip">
        <img src={logo} alt="KlipFit Logo" className="logo" />
      </div>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
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
            <input type="email" placeholder="Email" required />
            <TfiEmail className="icon" />
          </div>
          <div className="input-box">
            <input type="number" placeholder="Weight in kg" required />
            <LiaWeightSolid className="icon" />
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
          <button type="submit" className="submit-btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
