import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import BaseURL from "../../config";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored && stored !== "undefined" ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (token) {
      fetchUserDetails(token);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const handler = () => {
      try {
        const stored = localStorage.getItem("user");
        const parsed = stored && stored !== "undefined" ? JSON.parse(stored) : null;
        setUser(parsed);
      } catch {
        setUser(null);
      }
    };
  
    window.addEventListener("userUpdated", handler);
  
    return () => window.removeEventListener("userUpdated", handler);
  }, []);

  const fetchUserDetails = async (token) => {
    try {
      const response = await axios.get(`${BaseURL}api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
  
      // 🔥 IMPORTANT: keep user in sync
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
  
    } catch (error) {
      console.error("Error fetching user details:", error);
  
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const login = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      logout, 
      isAuthenticated,
      refreshUser: () => fetchUserDetails(localStorage.getItem("token"))
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
