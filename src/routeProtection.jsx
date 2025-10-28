import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  console.log(token, 'route protection')

  return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
