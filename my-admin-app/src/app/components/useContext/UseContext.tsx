
"use client";
import { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isAuth: boolean;
  setUserAuth: (auth: boolean) => void;
}

// Create context with default values
export const IsAuthContext = createContext<AuthContextType | null>(null);

interface IsAuthProviderProps {
  children: ReactNode;
}

export default function IsAuthProvider({ children }: IsAuthProviderProps) {
  const [isAuth, setUserAuth] = useState(false);

  useEffect(() => {
    async function fetchAuthStatus() {
      try {
        const response = await fetch("http://localhost:8080/api/auth/isAuth", {
          method: "POST",
          credentials: "include",
        });
        const res = await response.json();
        console.log("Auth Response:", res);

        if (res.success) {
          setUserAuth(true);
        } else {
          setUserAuth(false);
        }
      } catch (error) {
        console.error("Error fetching auth status:", error);
        setUserAuth(false); // Assume unauthenticated if fetch fails
      }
    }

    fetchAuthStatus();
  }, []);

  return (
    <IsAuthContext.Provider value={{ isAuth, setUserAuth }}>
      {children}
    </IsAuthContext.Provider>
  );
}
