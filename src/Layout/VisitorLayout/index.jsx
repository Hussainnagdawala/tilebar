import React, { useEffect } from "react";
import { RoutePaths } from "../../routes/RouterPaths";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../hooks";

const Index = ({ children }) => {
  const navigate = useNavigate();
  const { load } = useLocalStorage();
  const isToken = load("admin_token");

  useEffect(() => {
    if (isToken) {
      navigate(RoutePaths.dashboardPath);
    }
  }, [isToken, navigate]);

  return <React.Fragment>{children}</React.Fragment>;
};

export default Index;
