import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { get_transactions } from "../services/api.service";

function UserServices({ userProfile, setUserProfile }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userSubs, setUserSubs] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [userTransactions, setUserTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userProfile.length > 0) {
          const filteredSubscriptions = userProfile.filter(
            (subscription) => subscription.user.username === user.username
          );
          setUserSubs(filteredSubscriptions);
        }
      } catch (error) {
        console.error("Error fetching user subscriptions:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [user, userProfile]);

  const handleViewTransactions = async (id) => {
    try {
      if (selectedServiceId === id) {
        setSelectedServiceId(null);
        setUserTransactions([]);
      } else {
        setSelectedServiceId(id);
        const response = await get_transactions(id);
        setUserTransactions(response.data);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {userSubs.map((subscription) => (
        <div key={subscription.id}>
          <h2>{subscription.service.company_name}</h2>
          <p>Due Date: {subscription.due_date}</p>
          <p>Amount: {subscription.service.amount}</p>
          <button
            onClick={() => handleViewTransactions(subscription.service.id)}
          >
            {selectedServiceId === subscription.service.id
              ? "Hide Transactions"
              : "View Transactions"}
          </button>
          {selectedServiceId === subscription.service.id && (
            <div>
              <h3>Historical Transactions</h3>
              {userTransactions.map((transaction) => (
                <div key={transaction.id}>
                  <p>Amount Debited: {transaction.amount}</p>
                  <p>Date: {transaction.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default UserServices;
