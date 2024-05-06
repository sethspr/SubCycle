import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { get_subscriptions } from "../services/api.service";
import UserServices from "./UserServices";
import EscrowAccount from "./EscrowAccount";
import SubscriptionList from "./SubscriptionList"

function UserProfile() {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState([]);
  const [showSubscriptionList, setShowSubscriptionList] = useState(false);

  useEffect(() => {
    const getUserProfile = async () => {
      const subs = await get_subscriptions();

      setUserProfile(subs.data);
    };

    getUserProfile();
  }, [user]);

  return (
    <div className="user-profile">
      {user && <h1>Welcome back, {user.username}!</h1>}
      <button onClick={() => setShowSubscriptionList(!showSubscriptionList)}>
        {" "}
        {showSubscriptionList
          ? "Hide Subscriptions"
          : "Link Subscriptions to Profile"}
      </button>
      {showSubscriptionList && <SubscriptionList />}{" "}
      {/* Render SubscriptionList if showSubscriptionList is true */}
      <EscrowAccount />
      <UserServices userProfile={userProfile} />
    </div>
  );
}

export default UserProfile;
