"use client";
import { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isAuth: boolean;
  loading: boolean; // New state to track loading
  setUserAuth: (auth: boolean) => void;
}

// Create context with default values
export const IsAuthContext = createContext<AuthContextType | null>(null);

interface IsAuthProviderProps {
  children: ReactNode;
}

export default function IsAuthProvider({ children }: IsAuthProviderProps) {
  const [isAuth, setUserAuth] = useState(false);
  const [loading, setLoading] = useState(true); // Track authentication status

  useEffect(() => {
    async function fetchAuthStatus() {
      try {
        const response = await fetch("http://localhost:8080/api/auth/isAuth", {
          method: "POST",
          credentials: "include",
        });
        const res = await response.json();
        console.log("Auth Response:", res.success);

        setUserAuth(res.success);
      } catch (error) {
        console.error("Error fetching auth status:", error);
        setUserAuth(false);
      } finally {
        setLoading(false); // Stop loading when request completes
      }
    }

    fetchAuthStatus();
  }, []);

  return (
    <IsAuthContext.Provider value={{ isAuth, loading, setUserAuth }}>
      {children}
    </IsAuthContext.Provider>
  );
}
