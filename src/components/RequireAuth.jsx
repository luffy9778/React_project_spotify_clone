import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useContext(AuthContext);
  return auth?.userInfo?.roles.find((role) => allowedRoles?.includes(role)) ?
    <Outlet />
    : auth?.userInfo ?<Navigate to="/" /> :<Navigate to="/login" />
};

export default RequireAuth;
