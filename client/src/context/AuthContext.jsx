import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("jls_token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const storedToken = localStorage.getItem("jls_token");
      if (storedToken) {
        try {
          const res = await api.get("/auth/me");
          setUser(res.data.user);
        } catch (err) {
          console.error("Token verification failed:", err);
          localStorage.removeItem("jls_token");
          setUser(null);
          setToken(null);
        }
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    if (res.data.token) {
      localStorage.setItem("jls_token", res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
    }
    return res.data.user;
  };

  const register = async (userData) => {
    const res = await api.post("/auth/register", userData);
    if (res.data.token) {
      localStorage.setItem("jls_token", res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
    }
    return res.data.user;
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (e) {
      // Ignore network error on logout
    }
    localStorage.removeItem("jls_token");
    setToken(null);
    setUser(null);
  };

  const isAdmin = Boolean(user && user.role === "admin");

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAdmin,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
