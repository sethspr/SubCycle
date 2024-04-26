import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import SubscriptionList from '../components/SubscriptionList';



const App = () => {
  return(
    <div className='top-header'>
      <h1>SubCycle</h1>
      <Navbar />
      <div id='main'>
        <SubscriptionList />
      </div>
    </div>
  )
};

export default App;
