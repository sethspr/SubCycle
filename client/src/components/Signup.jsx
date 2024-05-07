import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { post_new_user } from "../services/api.service";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={submitUser} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="username"
                name="username"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                value={formData.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="email"
                name="email"
                required
                fullWidth
                id="email"
                label="Email Address"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="new-password"
                name="password"
                required
                fullWidth
                id="password"
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="new-password"
                name="passwordConfirm"
                required
                fullWidth
                id="passwordConfirm"
                label="Confirm Password"
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
        {error && <p className="error-message">Error: {error}</p>}
      </Box>
    </Container>
  );
}

export default Signup;
