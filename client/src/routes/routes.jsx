import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import SubscriptionList from './SubscriptionList';
import About from './About';
import Login from './Login';

const AppRoutes = () => (
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/subscriptions' element={<SubscriptionList />} />
    <Route path='/about' element={<About />} />
    <Route path='/login' element={<Login />} />
  </Routes>
);

export default AppRoutes;
