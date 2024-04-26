import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import SubscriptionList from '../components/SubscriptionList';
import About from '../components/About';
import Login from '../components/Login';

const AppRoutes = () => (
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/subscriptions' element={<SubscriptionList />} />
    <Route path='/about' element={<About />} />
    <Route path='/login' element={<Login />} />
  </Routes>
);

export default AppRoutes;
