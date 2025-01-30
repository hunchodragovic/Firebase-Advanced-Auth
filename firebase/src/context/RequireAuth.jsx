import { Navigate } from "react-router-dom";
import React from "react";
import { useAuth } from "../context/AuthContext"; // Importing the useAuth hook

const RequireAuth = ({ children }) => {
  const { currentUser } = useAuth(); // Accessing the currentUser from context

  // If the user is not logged in, redirect to the login page
  if (!currentUser) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  // If the user is authenticated, render the children components
  return children;
};

export default RequireAuth;
