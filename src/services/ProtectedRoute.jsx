import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./auth"; // Import the authentication helper

const ProtectedRoute = ({ children }) => {
 // console.log("Is Authenticated:", isAuthenticated()); // Debugging
  if (!isAuthenticated()) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

export default ProtectedRoute;
