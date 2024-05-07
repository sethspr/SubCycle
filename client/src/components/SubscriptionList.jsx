import React, { useState, useEffect } from "react";
import { add_sub_to_profile } from "../services/api.service";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useAuth } from "./AuthContext";

function SubscriptionList() {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);

  const fetchSubscriptions = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5555/services");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSubscriptions(data);
    } catch (error) {
      console.error("Failed to fetch subscriptions:", error);
    }
  };

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
          <Card key={service.id} sx={{ maxWidth: 400, px: 2, pt: 2 }}>
            <CardMedia
              component="img"
              height="auto"
              // width='60%'
              image={service.logo}
              alt="logo"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {service.company_name}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                ${service.amount}/month
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {service.description}
              </Typography>
            </CardContent>
            <CardActions>
              {user && "email" in user && (
                <Button
                  onClick={() => handleAddSubscription(service.id)}
                  size="small"
                >
                  Add subscription
                </Button>
              )}
            </CardActions>
          </Card>
        ))}
      </div>
    </>
  );
}

export default SubscriptionList;
