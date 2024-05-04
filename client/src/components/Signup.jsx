import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { post_new_user } from "../services/api.service";

function Signup() {
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const postNewUser = async (newUser) => {
    try {
      const response = await post_new_user(newUser);
      setUser(response.data);
      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error);
      setError("Error signing up. Please try again.");
    }
  };

  const submitUser = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newUser = {
        username: formData.username,
        email: formData.email,
        password_hash: formData.password,
      };
      postNewUser(newUser);
    }
  };

  // useEffect(() => {
  //   postNewUser();
  // }, [setUser]);

  function validateForm() {
    if (formData.password !== passwordConfirm) {
      setError("Passwords do not match.");
      return false;
    }
    if (!formData.username.trim()) {
      setError("Username cannot be empty.");
      return false;
    }
    if (!formData.email.trim() || !isValidEmail(formData.email)) {
      setError("Invalid email format.");
      return false;
    }
    return true;
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  return (
    <div className="form-container ">
      <h2>Join SubCycle Today!</h2>
      <form className="form" onSubmit={submitUser}>
        <input
          type="text"
          value={formData.username}
          onChange={handleChange}
          className="title-text"
          name="username"
          placeholder="Choose a Username"
        />

        <input
          type="text"
          value={formData.email}
          onChange={handleChange}
          className="title-text"
          name="email"
          placeholder="Your email address"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="title-text"
          placeholder="Password"
        />

        <input
          type="password"
          className="title-text"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          name="passwordConfirm"
          placeholder="Confirm Password"
        />

        <input type="submit" className="submit-button" />
      </form>
      {error && <p className="error-message">Error: {error}</p>}
    </div>
  );
}

export default Signup;
