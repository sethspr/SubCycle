import React, { createContext, useContext, useState, useEffect } from "react";
import {
  check_session,
  sign_in,
  sign_out,
  delete_cookie,
} from "../services/api.service";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loginMessage, setLoginMessage] = useState(null);

  const login = async (formData, navigate) => {
    const response = await sign_in(formData);
    const message = response.ok
      ? "Login successful!"
      : "Login failed. Please try again";

    setLoginMessage(message);
    if (response.ok) {
      setUser(response.data);

      setTimeout(() => {
        navigate("/userprofile");
      }, 1500);
    }
  };

  const logout = async () => {
    const response = await sign_out();
    if (response.ok) {
      setUser(null);
      delete_cookie("session");
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      const response = await check_session();
      setUser(response.data);
    };

    checkSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, logout, loginMessage, setLoginMessage }}
    >
      {children}
    </AuthContext.Provider>
  );
}
