// App.jsx
import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import AppRoutes from '../routes/routes';
import Navbar from '../components/Navbar';

const App = () => {
  return (
    <Router>
      <div>
        <div className='top-header'>
          <Link to='/' className='logo-link'>
            <h1>SubCycle</h1>
          </Link>
          <Navbar />
        </div>
        <AppRoutes />
      </div>
    </Router>
  );
};

export default App;
