import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../App";
import "./Login.css"; // Import the CSS file

export default function Login() {
  const { user, setUser } = useContext(AppContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async () => {
    try {
      const url = `${API_URL}/api/users/login`;
      const result = await axios.post(url, user);
      setUser(result.data);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <input
        type="text"
        placeholder="Email Address"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button onClick={handleSubmit}>Submit</button>
      <hr />
      <Link to="/register">Create Account</Link>
    </div>
  );
}
