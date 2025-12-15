import { createContext, useState, useEffect, useRef } from "react";

export const UserContext = createContext();

// Helper function to validate user data structure
const isValidUserData = (userData) => {
  if (!userData || typeof userData !== "object") return false;
  // Check if required fields exist
  const requiredFields = ["id", "email"];
  return requiredFields.every((field) => field in userData);
};

// Helper function to generate a simple hash for integrity check
const generateHash = (data) => {
  const str = JSON.stringify(data);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString();
};

export function UserProvider({ children }) {
  const isInitialMount = useRef(true);
  const storedHashRef = useRef(null);

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem("currentUser");
      const storedHash = localStorage.getItem("currentUser_hash");

      if (stored) {
        const userData = JSON.parse(stored);

        // Validate data structure
        if (!isValidUserData(userData)) {
          // console.warn(
          //   "Invalid user data structure in localStorage. Clearing..."
          // );
          localStorage.removeItem("currentUser");
          localStorage.removeItem("currentUser_hash");
          return null;
        }

        // Verify integrity with hash
        const computedHash = generateHash(userData);
        if (storedHash && storedHash !== computedHash) {
          // console.warn(
          //   "User data integrity check failed. Data may have been tampered with. Clearing..."
          // );
          localStorage.removeItem("currentUser");
          localStorage.removeItem("currentUser_hash");
          return null;
        }

        storedHashRef.current = computedHash;
        return userData;
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      localStorage.removeItem("currentUser");
      localStorage.removeItem("currentUser_hash");
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
      const userDataString = JSON.stringify(currentUser);
      const hash = generateHash(currentUser);
      localStorage.setItem("currentUser", userDataString);
      localStorage.setItem("currentUser_hash", hash);
      storedHashRef.current = hash;
    } else {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("currentUser_hash");
      storedHashRef.current = null;
    }
  }, [currentUser]);

  // Periodic validation to detect manual localStorage tampering
  useEffect(() => {
    const validateStoredData = () => {
      if (!currentUser) return;

      try {
        const stored = localStorage.getItem("currentUser");
        const storedHash = localStorage.getItem("currentUser_hash");

        if (!stored || !storedHash) {
          // Data was removed, log out user
          // console.warn("User data removed from localStorage. Logging out...");
          setCurrentUser(null);
          return;
        }

        const userData = JSON.parse(stored);
        const computedHash = generateHash(userData);

        // Check if hash matches
        if (
          storedHash !== computedHash ||
          storedHash !== storedHashRef.current
        ) {
          console.warn("User data was tampered with. Logging out...");
          localStorage.removeItem("currentUser");
          localStorage.removeItem("currentUser_hash");
          setCurrentUser(null);
          return;
        }

        // Validate data structure
        if (!isValidUserData(userData)) {
          console.warn("Invalid user data structure detected. Logging out...");
          localStorage.removeItem("currentUser");
          localStorage.removeItem("currentUser_hash");
          setCurrentUser(null);
        }
      } catch (error) {
        console.error("Error validating localStorage:", error);
        localStorage.removeItem("currentUser");
        localStorage.removeItem("currentUser_hash");
        setCurrentUser(null);
      }
    };

    // Check every 2 seconds for tampering
    const intervalId = setInterval(validateStoredData, 2000);

    return () => clearInterval(intervalId);
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}
