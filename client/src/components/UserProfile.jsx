import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { get_subscriptions, get_escrow_account } from "../services/api.service";
import UserServices from "./UserServices";
import EscrowAccount from "./EscrowAccount";

function UserProfile() {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState([]);

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
      <EscrowAccount />
      <UserServices userProfile={userProfile} />
    </div>
  );
}

export default UserProfile;
