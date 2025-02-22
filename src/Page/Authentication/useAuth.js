import { useState, useEffect } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("authToken") // Check token initially
  );

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      setIsAuthenticated(!!token);
    };


    window.addEventListener("storage", checkAuth); // Listen for token changes
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  return isAuthenticated;
};

export default useAuth;
