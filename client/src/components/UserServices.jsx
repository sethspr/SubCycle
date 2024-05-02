import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { get_services } from "../services/api.service";

function UserServices({ userProfile, setUserProfile }) {
  const { user } = useAuth();

  const getServices = async () => {
    const response = await get_services();
    setUserProfile(response.data);
  };

  useEffect(() => {
    if (user) {
      getServices();
    }
  }, [user]); 

  return (
    <div>
      <h1>User Services Component</h1>
      {userProfile.map((services) => (
        <div key={services.id}>
          <p>{services.company_name}</p>
        </div>
      ))}
    </div>
  );
}

export default UserServices;
