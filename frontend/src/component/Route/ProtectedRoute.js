import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isAuthecated, loading } = useSelector((state) => state.user);

  if (isAuthecated ===false) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
export default ProtectedRoute;
