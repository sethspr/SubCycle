import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { get_subscriptions } from "../services/api.service";
import UserServices from "./UserServices";

function UserProfile() {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState([]);

  const getSubscription = async () => {
    const response = await get_subscriptions();
    setUserProfile(response.data);
  };

  useEffect(() => {
    getSubscription();
  }, [user]);

  return (
    <div className="user-profile">
      <h1>Welcome back!</h1> 
      {/* need a conditional here so user.username is not Null when user is not logged in */}
      <UserServices userProfile={userProfile} />
    </div>
  );
}

export default UserProfile;
