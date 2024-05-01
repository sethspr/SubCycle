import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext'; // adjust the path as needed

function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/'); 
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

export default Logout;
