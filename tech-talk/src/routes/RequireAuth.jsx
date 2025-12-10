import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

/**
 * RequireAuth Component
 * Protects routes by checking if a user is authenticated
 * If not authenticated, redirects to /login
 * If authenticated, renders the requested component
 *
 * Usage:
 * <Route path="/app" element={<RequireAuth><MainLayout /></RequireAuth>} />
 */
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
