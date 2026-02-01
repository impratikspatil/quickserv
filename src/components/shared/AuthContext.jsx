import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import BaseURL from "../../config";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user details when component mounts or token changes
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(token);
      fetchUserDetails(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserDetails = async (token) => {
    try {
      const response = await axios.get(`${BaseURL}api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUserDetails(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
      // If token is invalid, clear it
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        setUser(null);
        setUserDetails(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const login = (token) => {
    localStorage.setItem("token", token);
    setUser(token);
    fetchUserDetails(token);
  };

  const logout = (navigate) => {
    localStorage.removeItem("token");
    setUser(null);
    setUserDetails(null);
    if (navigate) navigate("/login");
  };

  const updateUserDetails = (newDetails) => {
    setUserDetails(newDetails);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      userDetails, 
      loading, 
      login, 
      logout, 
      updateUserDetails,
      refreshUser: () => fetchUserDetails(localStorage.getItem("token"))
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ This is required for useAuth to work in other files
export const useAuth = () => useContext(AuthContext);
