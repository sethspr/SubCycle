import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import Logout from '../components/Logout'

const Navbar = () => {
  const { user } = useAuth();

  return (
    <div className='navbar'>
      <nav>
        <ul>
          <li><Link to='/subscriptions'>Subscriptions</Link></li>
          <li><Link to='/about'>About</Link></li>
          {user ? (
            <li><Link to='/logout'>Logout</Link></li>
          ) : (
            <li><Link to='/login'>Login</Link></li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
