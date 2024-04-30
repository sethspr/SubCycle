import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import SubscriptionList from '../components/SubscriptionList';
import About from '../components/About';
import Login from '../components/Login';
import Logout from '../components/Logout';

const AppRoutes = () => (
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/subscriptions' element={<SubscriptionList />} />
    <Route path='/about' element={<About />} />
    <Route path='/login' element={<Login />} />
    <Route path='/logout' element={<Logout />} />
  </Routes>
);

export default AppRoutes;
