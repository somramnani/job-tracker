import React, { createContext, useState, useContext } from "react";
import { googleLogout } from "@react-oauth/google";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    googleLogout();
    setUser(null);

    alert("Logged out!");
  };

  const contextValue = {
    user,
    setUser,
    handleLogout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
