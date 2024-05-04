import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { login, loginMessage } = useAuth(); // Get loginMessage from useAuth hook
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    login(formData, navigate); // No need to pass setLoginMessage here
  };

  const handleSignUpclick = () => {
    navigate('/signup');
  };


  return (
    <div>
      <h2>Login</h2>
      {loginMessage && <p>{loginMessage}</p>}
      <form onSubmit={handleSubmit} method="POST" action="/login">
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
        <button type="button" onClick={handleSignUpclick}>Sign Up Now</button>
    </div>
  );
}

export default Login;
