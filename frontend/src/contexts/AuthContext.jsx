import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContextDefinition";

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fonction pour récupérer le statut d'abonnement
  const fetchSubscriptionStatus = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/user-status/", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setUsername(data.username);
        setIsSubscribed(data.is_subscribed || false);
        setIsAdmin(data.is_admin || false);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du statut:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
      fetchSubscriptionStatus();
    } else {
      setLoading(false);
    }
  }, []);

  const login = (username) => {
    localStorage.setItem("username", username);
    setUsername(username);
    // Récupérer le statut après la connexion
    fetchSubscriptionStatus();
  };

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUsername(null);
    setIsSubscribed(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ username, isSubscribed, isAdmin, loading, login, logout, fetchSubscriptionStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
