import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loginMessage, setLoginMessage] = useState(null);

  const login = (formData, navigate) => {
    // Remove setLoginMessage from parameters
    fetch("http://localhost:5555/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    //   credentials: "include",
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          setLoginMessage("Login successful!");
          setTimeout(() => {
            navigate("/"); // Redirect to home page or any other protected route
          }, 2000); // Wait for 2 seconds before navigating to '/'
        } else {
          setLoginMessage("Login failed. Please try again");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoginMessage("Login failed. Please try again");
      });
  };

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
    <AuthContext.Provider
      value={{ user, login, logout, loginMessage, setLoginMessage }}
    >
      {children}
    </AuthContext.Provider>
  );
}
