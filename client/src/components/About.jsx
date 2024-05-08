import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import GithubPhoto from "../Assets/github-qr-code.png";
import LinkedInPhoto from "../Assets/Linked-in-qr-code.png";
import ProfilePic from "../Assets/profile-pic.png";
import PythonLogo from "../Assets/python-icon.png"
import ReactLogo from "../Assets/react-icon.png"
import MuiLogo from "../Assets/mui-icon.png"
import FlaskLogo from "../Assets/flask-icon.png"

const AboutPage = () => {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "50vh",
        }}
      >
        <Typography variant="h4" gutterBottom mt={2} mb={2}>
          ABOUT THE PROJECT
        </Typography>
        <Avatar
          alt="Profile Picture"
          src={ProfilePic}
          sx={{ width: 300, height: 300, marginBottom: 2 }}
        />
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={GithubPhoto}
                alt="GitHub Logo"
                style={{ width: "70%" }}
              />
              <Typography variant="body1">
                <Link
                  href="https://github.com/sethspr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Link>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={LinkedInPhoto}
                alt="LinkedIn Logo"
                style={{ width: "70%" }}
              />
              <Typography variant="body1">
                <Link
                  href="https://www.linkedin.com/in/sethspring/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Typography variant="h4" gutterBottom mt={2} mb={2}>
          TECH STACK
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={6} md={3} sx={{ textAlign: "center" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={PythonLogo}
                alt="Python Logo"
                style={{ width: "240px", height: "240px" }}
              />
            </Box>
          </Grid>
          <Grid item xs={6} md={3} sx={{ textAlign: "center" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={ReactLogo}
                alt="React Logo"
                style={{ width: "240px", height: "240px" }}
              />
            </Box>
          </Grid>
          <Grid item xs={6} md={3} sx={{ textAlign: "center" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={MuiLogo}
                alt="Image 3"
                style={{ width: "240px", height: "240px" }}
              />
            </Box>
          </Grid>
          <Grid item xs={6} md={3} sx={{ textAlign: "center" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={FlaskLogo}
                alt="Image 4"
                style={{ width: "240px", height: "240px" }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AboutPage;
