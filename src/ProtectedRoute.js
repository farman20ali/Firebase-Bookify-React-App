import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};


export default ProtectedRoute;
