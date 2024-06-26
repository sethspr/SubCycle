import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { get_subscriptions } from "../services/api.service";
import UserServices from "./UserServices";
import EscrowAccount from "./EscrowAccount";
import SubscriptionList from "./SubscriptionList";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function UserProfile() {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState([]);
  const [showSubscriptionList, setShowSubscriptionList] = useState(false);

  useEffect(() => {
    const getUserProfile = async () => {
      if (!user) return;

      const subs = await get_subscriptions(user.id);
      console.dir(subs.data);

      setUserProfile(subs.data);
    };

    getUserProfile();
  }, [user]);

  return (
    <Box sx={{ mx: "auto", p: 2 }}>
      {user && (
        <Typography variant="h4">Welcome back, {user.username}!</Typography>
      )}
      <Box mt={2} mb={2}>
        <button onClick={() => setShowSubscriptionList(!showSubscriptionList)}>
          {showSubscriptionList
            ? "Hide Subscriptions"
            : "Link Subscriptions to Profile"}
        </button>
      </Box>
      {showSubscriptionList && <SubscriptionList />}
      <EscrowAccount />
      <UserServices userProfile={userProfile} />
    </Box>
  );
}

export default UserProfile;
