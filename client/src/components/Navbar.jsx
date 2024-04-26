import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar'>
        <nav>
            <ul>
                <li>Home</li>
                <li>Subscription Services</li>
                <li>About</li>
                <li>Login</li>
            </ul>
        </nav>
    </div>
  );
};

export default Navbar;
