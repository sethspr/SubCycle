import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const logout = () => {
    fetch("http://127.0.0.1:5555/logout", {
      method: "DELETE",
      credentials: "include", // to include cookies
    })
      .then((response) => {
        if (response.ok) {
          setUser(null);
        }
      })
      .catch((error) => console.error("Logout Failed:", error));
  };

  const checkSession = () => {
    fetch("http://127.0.0.1:5555/check_session", {
      credentials: "include", // to include cookies
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          setUser(data);
        } else {
          setUser(null);
        }
      })
      .catch((error) => console.error("Session check failed:", error));
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

