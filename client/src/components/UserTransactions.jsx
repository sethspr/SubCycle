import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { get_transactions } from "../services/api.service";

function UserTransactions({ userProfile, setUserProfile }) {
  const { user } = useAuth();
  return <div>UserTransactions</div>;
}

export default UserTransactions;
