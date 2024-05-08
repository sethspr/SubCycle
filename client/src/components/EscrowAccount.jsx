import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import {
  get_escrow_account,
  patch_escrow_account,
} from "../services/api.service";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

function EscrowAccount() {
  const { user } = useAuth();
  const [account, setAccount] = useState(null);
  const [newFunds, setNewFunds] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAccount = async () => {
      if (!user) return;

      await get_escrow_account(user.id)
        .then((response) => setAccount(response.data))
        .catch((e) => console.error("Error fetching escrow account!", e));
    };

    fetchAccount();
  }, [user]);

  const handleAddFunds = async (e) => {
    e.preventDefault();
    try {
      const response = await patch_escrow_account(user.id, newFunds);
      setAccount(response.data);
      setNewFunds(""); // Clear input field
      setError(""); // Clear previous errors
    } catch (error) {
      setError("Error adding funds to escrow account.");
      console.error("Error adding funds to escrow account:", error);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6">Escrow Account</Typography>
          {account ? (
            <>
              <Typography>Balance: ${account.balance}</Typography>
              <form onSubmit={handleAddFunds}>
                <TextField
                  type="number"
                  margin="none"
                  value={newFunds}
                  onChange={(e) => setNewFunds(e.target.value)}
                  placeholder="Enter amount to add"
                  sx={{ mt: 1, width: '15%'}}
                />
                <Box mt={1}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 1, width: '15%' }}
                  >
                    Add Funds
                  </Button>
                </Box>
              </form>
            </>
          ) : (
            <Typography>Loading account details...</Typography>
          )}
          {error && <Typography color="error">{error}</Typography>}
        </CardContent>
      </Card>
    </Box>
  );
}

export default EscrowAccount;
