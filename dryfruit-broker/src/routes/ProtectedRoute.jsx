import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, role } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/login" replace/>;
  if (allowedRoles && !allowedRoles.includes(role)) {

   return <Navigate to="/unauthorized" replace />;
  }
  return children;
};

export default ProtectedRoute;
