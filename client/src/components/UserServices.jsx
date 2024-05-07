import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { get_transactions } from "../services/api.service";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function UserServices({ userProfile }) {
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

  const handleViewTransactions = async (user_sub) => {
    try {
      if (selectedServiceId === user_sub.service.id) {
        setSelectedServiceId(null);
        setUserTransactions([]);
      } else {
        setSelectedServiceId(user_sub.service.id);
        const response = await get_transactions();
        const filteredTransactions = response.data.filter(
          (user_transaction) => 
            user_transaction.user_id === user.id &&
            user_transaction.subscription_id === user_sub.id
        );
        // console.log(filteredTransactions)
        setUserTransactions(filteredTransactions);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ mt: 4 }}>
      {userSubs.map((subscription) => (
        <Box key={subscription.id} mb={2}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">
                {subscription.service.company_name}
              </Typography>
              <Typography variant="body1">
                Due Date: Monthly on day {subscription.due_date}.
              </Typography>
              <Typography variant="body1">
                Amount: ${subscription.service.amount} per month
              </Typography>
              <Button onClick={() => handleViewTransactions(subscription)}>
                {selectedServiceId === subscription.service.id
                  ? "Hide Transactions"
                  : "View Transactions"}
              </Button>
              {selectedServiceId === subscription.service.id && (
                <Box mt={2}>
                  <Typography variant="h6">Historical Transactions</Typography>
                  {userTransactions.map((transaction) => (
                    <Box key={transaction.id}>
                      <Typography>
                        Amount Debited: ${transaction.transaction_amount}
                      </Typography>
                      <Typography>Date: {transaction.date}</Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
}

export default UserServices;
