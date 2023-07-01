import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute({ isAdmin, children }) {
  const { isAuthecated, loading, user } = useSelector((state) => state.user);
  // console.log(loading)
  // console.log(isAuthecated)
  if (loading === false) {
    if (!isAuthecated) {
      return <Navigate to="/login" />;
    }
    if (isAdmin === true && user.role !== "admin") {
      return <Navigate to="/login" replace />;
    }
    return children;
  }
}

export default ProtectedRoute;

// import React from "react";
// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

// function ProtectedRoute({ children }) {
//   const { isAuthecated, loading } = useSelector((state) => state.user);

//   if (isAuthecated ===false) {
//     return <Navigate to="/login" replace />;
//   }
//   return children;
// }
// export default ProtectedRoute;
