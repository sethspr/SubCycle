import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import Button from "@mui/material/Button";

function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Button color="inherit" onClick={handleLogout}>
      Logout
    </Button>
  );
}

export default Logout;
