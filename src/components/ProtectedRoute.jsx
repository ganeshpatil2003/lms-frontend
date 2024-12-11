import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import store from "../store/store.js";

export const ProtectedRoute = ({ children }) => {
  const { isAunthenticated } = useSelector((store) => store.auth);
  // console.log(store.getState())
  if (!isAunthenticated) {
    return <Navigate to={"/login"} />;
  }

  return children;
};

export const AuthenticatedUser = ({ children }) => {
  const { user, isAunthenticated } = useSelector((store) => store.auth);

  if (isAunthenticated) {
    return <Navigate to={"/"} />;
  }

  return children;
};

export const AdminRoute = ({ children }) => {
  const { user, isAunthenticated } = useSelector((store) => store.auth);

  if (!isAunthenticated) {
    return <Navigate to={"/login"} />;
  }

  if (user.role !== "instructor") {
    return <Navigate to={"/"} />;
  }
  return children;
};
