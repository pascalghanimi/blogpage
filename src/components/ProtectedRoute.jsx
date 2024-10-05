import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/register");
    }
  }, [user]);

  return <div>{children}</div>;
};

export default ProtectedRoute;
