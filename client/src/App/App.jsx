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
          <Navbar />
        </div>
        <AppRoutes />
      </div>
    </Router>
  );
};

export default App;
