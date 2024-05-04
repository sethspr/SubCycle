import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { get_subscriptions, get_escrow_account } from "../services/api.service";
import UserServices from "./UserServices";
import EscrowAccount from "./EscrowAccount";

function UserProfile() {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState([]);
  const [escrowAccount, setEscrowAccount] = useState(null); // need to figure out where to call escrowAccount

  const getSubscription = async () => {
    const response = await get_subscriptions();
    setUserProfile(response.data);
  };

  const getAccount = async () => {
    const response = await get_escrow_account();
    setEscrowAccount(response.data);
  };

  useEffect(() => {
    getSubscription();
    getAccount();
  }, [user]);

    return (
    <div className="user-profile">
      {user && <h1>Welcome back, {user.username}!</h1>}
      {/* {escrowAccount && (
        <div>
          <h2>Escrow Account Details</h2>
          <p>Balance: {escrowAccount.balance}</p>
        </div>
      )} */}
      <EscrowAccount />
      <UserServices userProfile={userProfile} />
    </div>
  );
}
//   return (
//     <div className="user-profile">
//       <h1>Welcome back!</h1> 
//       {/* need a conditional here so user.username is not Null when user is not logged in */}
//       <UserServices userProfile={userProfile} />
//     </div>
//   );
// }

export default UserProfile;
