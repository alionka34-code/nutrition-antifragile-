import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContextDefinition";

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
  }, []);

  const login = (username) => {
    localStorage.setItem("username", username);
    setUsername(username);
  };

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
