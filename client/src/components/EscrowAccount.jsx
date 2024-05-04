import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import {
  get_escrow_account,
  patch_escrow_account,
} from "../services/api.service";

function EscrowAccount() {
  const { user } = useAuth();
  const [account, setAccount] = useState(null);
  const [newFunds, setNewFunds] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await get_escrow_account(user.id); // Assuming user.id exists
        setAccount(response.data);
      } catch (error) {
        console.error("Error fetching escrow account:", error);
      }
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
    <div className="escrow-account">
      <h2>Escrow Account</h2>
      {account ? (
        <div>
          <p>Balance: {account.balance}</p>
          <form onSubmit={handleAddFunds}>
            <input
              type="number"
              value={newFunds}
              onChange={(e) => setNewFunds(e.target.value)}
              placeholder="Enter amount to add"
            />
            <button type="submit">Add Funds</button>
          </form>
        </div>
      ) : (
        <p>Loading account details...</p>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default EscrowAccount;
