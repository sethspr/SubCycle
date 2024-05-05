import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { post_new_user } from "../services/api.service";

function validate_password(password, confirm) {
  if (!password || !password.trim())
    return { isValid: false, reason: "Password cannot be blank!" };
  if (!confirm || !confirm.trim())
    return { isValid: false, reason: "Password confirmation cannot be blank!" };

  return password === confirm
    ? { isValid: true }
    : { isValid: false, reason: "Passwords must match!" };
}

function validate_username(username) {
  return !!username.trim()
    ? { isValid: true }
    : { isValid: false, reason: "Username cannot be empty!" };
}

function validate_email(email) {
  if (!email.trim()) {
    return { isValid: false, reason: "Email cannot be empty!" };
  }

  const email_test = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  return email_test
    ? { isValid: true }
    : { isValid: false, reason: "Invalid email format!" };
}

function validate_userForm(username, email, password, password_confirm) {
  const result_username = validate_username(username);
  if (!result_username.isValid) return result_username;

  const result_email = validate_email(email);
  if (!result_email.isValid) return result_email;

  const result_password = validate_password(password, password_confirm);
  if (!result_password.isValid) return result_password;

  return { isValid: true };
}

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

  const submitUser = async ($event) => {
    $event.preventDefault();

    const validation_result = validate_userForm(
      formData.username,
      formData.email,
      formData.password,
      passwordConfirm
    );

    // if form isnt valid setError and then return
    if (!validation_result.isValid) {
      setError(validation_result.reason);
      return;
    }

    const new_user = {
      username: formData.username,
      email: formData.email,
      password_hash: formData.password,
    };

    await post_new_user(new_user)
      .then((response) => {
        setUser(response.data);
        navigate("/login");
      })
      .catch((e) => {
        console.error("Error signing up:", e);
        setError("Error signing up. Please try again.");
      });
  };

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
