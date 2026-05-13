import { createContext, useState, useEffect, useRef } from "react";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
});

// Generate a secure session token
const generateToken = (userData) => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  const dataString = JSON.stringify({
    email: userData.email,
    timestamp,
    random,
  });

  let hash = 0;
  for (let i = 0; i < dataString.length; i++) {
    const char = dataString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  return `${Math.abs(hash).toString(36)}.${random}.${timestamp.toString(36)}`;
};

export function UserProvider({ children }) {
  const isInitialMount = useRef(true);
  const tokenRef = useRef(null);
  const userDataRef = useRef(null); // Store ALL user data in memory only

  const [currentUser, setCurrentUser] = useState(() => {
    // Clean up old localStorage keys from previous implementation
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentUser_hash");
    localStorage.removeItem("_sk");
    sessionStorage.removeItem("uid");

    try {
      const token = localStorage.getItem("authToken");
      const encryptedData = sessionStorage.getItem("_usr");

      if (token && encryptedData) {
        // Decrypt and restore user data from sessionStorage
        try {
          const userData = JSON.parse(atob(encryptedData));
          tokenRef.current = token;
          userDataRef.current = userData;
          return userData;
        } catch {
          localStorage.removeItem("authToken");
          sessionStorage.removeItem("_usr");
          return null;
        }
      }
    } catch (error) {
      console.error("Error restoring session:", error);
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("_usr");
    }
    return null;
  });

  useEffect(() => {
    // Skip validation on initial mount since we already validated in useState
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (currentUser) {
      // Generate and store ONLY the token in localStorage
      const token = generateToken(currentUser);
      tokenRef.current = token;
      localStorage.setItem("authToken", token);

      // Store encrypted user data in sessionStorage (memory only, clears on browser close)
      userDataRef.current = currentUser;
      sessionStorage.setItem("_usr", btoa(JSON.stringify(currentUser)));
    } else {
      // Clear everything on logout
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("_usr");
      tokenRef.current = null;
      userDataRef.current = null;
    }
  }, [currentUser]);

  // Periodic validation to detect token tampering
  useEffect(() => {
    const validateToken = () => {
      if (!currentUser) return;

      try {
        const token = localStorage.getItem("authToken");
        const sessionData = sessionStorage.getItem("_usr");

        // If token or session data is missing, log out
        if (!token || !sessionData) {
          setCurrentUser(null);
          return;
        }

        // If token was tampered with, log out
        if (token !== tokenRef.current) {
          localStorage.removeItem("authToken");
          sessionStorage.removeItem("_usr");
          setCurrentUser(null);
          return;
        }

        // Validate session data integrity
        try {
          const userData = JSON.parse(atob(sessionData));
          if (!userData || !userData.email || !userData.id) {
            setCurrentUser(null);
          }
        } catch {
          setCurrentUser(null);
        }
      } catch (error) {
        console.error("Error validating token:", error);
        localStorage.removeItem("authToken");
        sessionStorage.removeItem("_usr");
        setCurrentUser(null);
      }
    };

    // Check every 2 seconds for tampering
    const intervalId = setInterval(validateToken, 2000);

    return () => clearInterval(intervalId);
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}
