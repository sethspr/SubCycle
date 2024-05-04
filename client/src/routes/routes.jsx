import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import SubscriptionList from '../components/SubscriptionList';
import About from '../components/About';
import Login from '../components/Login';
import Logout from '../components/Logout';
import UserProfile from '../components/UserProfile';
import Signup from '../components/Signup';

const AppRoutes = () => (
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/subscriptions' element={<SubscriptionList />} />
    <Route path='/about' element={<About />} />
    <Route path='/userprofile' element={<UserProfile />} />
    <Route path='/login' element={<Login />} />
    <Route path='/logout' element={<Logout />} />
    <Route path='/signup' element={<Signup />} />
  </Routes>
);

export default AppRoutes;
