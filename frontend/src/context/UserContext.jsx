import { createContext, useEffect, useState } from "react";
import API from "../api/api";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const verifySession = async () => {
      try {
        await API.get("/auth/csrf");
        const response = await API.get("/users/me");
        if (active) setCurrentUser(response.data);
      } catch {
        if (active) setCurrentUser(null);
      } finally {
        if (active) setAuthLoading(false);
        }
    };
    verifySession();
    return () => {
      active = false;
    };
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, authLoading }}>
      {children}
    </UserContext.Provider>
  );
}
