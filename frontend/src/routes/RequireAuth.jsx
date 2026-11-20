import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function RequireAuth({ children }) {
  const { currentUser, authLoading } = useContext(UserContext);

  if (authLoading) return null;
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // User is authenticated, render the protected component
  return children;
}
