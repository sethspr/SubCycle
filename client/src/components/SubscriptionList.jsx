import React, { useState, useEffect } from "react";
import { add_sub_to_profile } from "../services/api.service";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useAuth } from "./AuthContext";

function SubscriptionList() {
  // State to hold and set the list of subscriptions/services
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);

  // Function to fetch subscriptions from the backend app.py
  const fetchSubscriptions = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5555/services");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSubscriptions(data); // Set the subscriptions in state
    } catch (error) {
      console.error("Failed to fetch subscriptions:", error);
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
    <>
      <h1>Supported Subscriptions</h1>
      <div className="subscription-grid">
        {subscriptions.map((service) => (
          <>
            <Box>
              <Card variant="outlined">
                <React.Fragment>
                  <CardContent>
                    <div className="flex-auto items-center">
                      <Typography variant="h4">
                        {service.company_name}
                      </Typography>

                      <Typography variant="h6" sx={{ margin: "0 1rem" }}>
                        ${service.amount}/month
                      </Typography>
                    </div>

                    <Typography color="text.secondary" sx={{ fontSize: 16 }}>
                      {service.description}
                    </Typography>
                  </CardContent>

                  <CardActions>
                    {user && "email" in user && (
                      <Button onClick={() => handleAddSubscription(service.id)}>
                        Add subscription
                      </Button>
                    )}
                  </CardActions>
                </React.Fragment>
              </Card>
            </Box>
          </>
        ))}
      </div>
    </>
  );
}

export default SubscriptionList;
