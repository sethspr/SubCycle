import React, { useState, useEffect } from 'react';
import { add_sub_to_profile } from "../services/api.service";

function SubscriptionList() {
  // State to hold and set the list of subscriptions/services
  const [subscriptions, setSubscriptions] = useState([]);
  

  // Function to fetch subscriptions from the backend app.py
  const fetchSubscriptions = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5555/services');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSubscriptions(data);  // Set the subscriptions in state
    } catch (error) {
      console.error('Failed to fetch subscriptions:', error);
    }
  };

  // useEffect to trigger the fetch when the component mounts
  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const handleAddSubscription = async (serviceId) => {
    try {
      await add_sub_to_profile(serviceId); 
      const updatedSubscriptions = await add_sub_to_profile(); 
      setSubscriptions(updatedSubscriptions); 
      alert("Subscription added successfully!");
    } catch (error) {
      console.error("Failed to add subscription:", error);
      alert("Failed to add subscription. Please try again later.");
    }
  };

  return (
    <div>
      <h1>Supported Subscriptions</h1>
      {subscriptions.map((service) => (
        <div key={service.id}>
          <h2>{service.company_name}</h2>
          <p>{service.description}</p>
          <p>Monthly Cost: {service.amount}</p>
          <button onClick={() => handleAddSubscription(service.id)}>
            Add Subscription
          </button>
        </div>
      ))}
    </div>
  );
}

export default SubscriptionList;
