import React, { useContext, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const ProtectRoute = () => {
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser) {
      toast.error("Please login!");
    }
  }, [currentUser]);

  return currentUser ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectRoute;
