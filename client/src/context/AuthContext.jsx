import { createContext, useState, useEffect, useCallback } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");
    const name = localStorage.getItem("loggedInUser");
    const email = localStorage.getItem("userEmail");

    if (token) {
      setIsLoggedIn(true);
      setUserRole(role);
      setUserName(name);
      setUserEmail(email);
    } else {
      setIsLoggedIn(false);
      setUserRole(null);
      setUserName("");
      setUserEmail("");
    }
    setLoading(false);
  }, []);

  const login = useCallback((token, role, name, email) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userRole", role);
    localStorage.setItem("loggedInUser", name);
    localStorage.setItem("userEmail", email);
    
    setIsLoggedIn(true);
    setUserRole(role);
    setUserName(name);
    setUserEmail(email);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("userEmail");
    
    setIsLoggedIn(false);
    setUserRole(null);
    setUserName("");
    setUserEmail("");
  }, []);

  const value = {
    isLoggedIn,
    userRole,
    userName,
    userEmail,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
