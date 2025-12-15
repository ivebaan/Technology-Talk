import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function RequireAuth({ children }) {
  const { currentUser } = useContext(UserContext);

  // Check if user is logged in (from context + localStorage)
  if (!currentUser) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" replace />;
  }

  // User is authenticated, render the protected component
  return children;
}
