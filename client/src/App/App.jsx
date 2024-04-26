// App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';
import AppRoutes from './Routes';

const App = () => {
  return (
    <Router>
      <div>
        <div className='top-header'>
          <h1>SubCycle</h1>
          <Navbar />
        </div>
        <AppRoutes />
      </div>
    </Router>
  );
};

export default App;
