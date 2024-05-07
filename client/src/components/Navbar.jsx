import React from "react";
import Logout from "./Logout";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [profileAnchor, setProfileAnchor] = React.useState(null);
  const [menuAnchor, setMenuAnchor] = React.useState(null);

  const toggleProfileMenu = (event) => {
    setProfileAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setProfileAnchor(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ flexGrow: 1 }}>
          <Typography variant="h5" component="div">
            SubCycle
          </Typography>

          <Button variant="text" color="inherit" sx={{ marginLeft: "1rem" }}>
            <Link to="/">About</Link>
          </Button>

          <Button variant="text" color="inherit" sx={{ marginLeft: "1rem" }}>
            <Link to="/subscriptions">Subscriptions</Link>
          </Button>

          <div className="flex-auto justify-end">
            <IconButton
              size="large"
              color="inherit"
              onClick={toggleProfileMenu}
            >
              <AccountCircle />
            </IconButton>
          </div>

          <Menu
            id="profile-menu"
            anchorEl={profileAnchor}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(profileAnchor)}
            onClose={handleClose}
          >
            {user && "email" in user ? (
              <>
                <MenuItem onClick={handleClose}>
                  <Link to="/userprofile">User Profile</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to="/">Logout</Link>
                </MenuItem>
              </>
            ) : (
              <MenuItem onClick={handleClose}>
                <Link to="/login">Login</Link>
              </MenuItem>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
