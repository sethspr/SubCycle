import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import Logout from '../components/Logout'

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate()

  const handleLogout = () => {
    logout();
    navigate('/')
  }

  return (
    <div className='navbar'>
      <nav>
        <ul>
          <li><Link to='/subscriptions'>Subscriptions</Link></li>
          <li><Link to='/about'>About</Link></li>
          <li><Link to='/login'>Login</Link></li>
          {user ? (
            <button onClick={handleLogout} className='logout-button'>Logout</button>
          ) : (
            <li><Link to='/logout'>Logout</Link></li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
