import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h2>Welcome to SubCycle!</h2>
    <p>This is the home page.</p>
    <Link to='/subscriptions'>View Subscriptions</Link>
  </div>
);

export default Home;
