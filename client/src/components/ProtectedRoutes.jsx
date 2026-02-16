import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Protected Route for Admin
export const ProtectedAdminRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    const token = localStorage.getItem("token");

    if (token && userRole === "admin") {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
          <p className="mt-4 text-gray-600">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

// Protected Route for Users
export const ProtectedUserRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
          <p className="mt-4 text-gray-600">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};
