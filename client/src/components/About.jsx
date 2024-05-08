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
        <Typography variant="h4" gutterBottom>
          About Me
        </Typography>
        <Avatar
          alt="Profile Picture"
          src={ProfilePic}
          sx={{ width: 300, height: 300, marginBottom: 2 }}
        />
        <Grid container spacing={3} alignItems="center">
          {/* GitHub Link */}
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
          {/* LinkedIn Link */}
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
        {/* Inspiration Message */}
        <Typography variant="body1" paragraph>
          This webpage was created as part of the Phase 5 final project for
          Flatiron School in NYC.
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutPage;
