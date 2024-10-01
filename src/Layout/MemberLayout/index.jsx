import React, { useEffect } from "react";
import { useLocalStorage } from "../../hooks";
import { useNavigate } from "react-router-dom";

const Index = ({ children }) => {
  const { load } = useLocalStorage();
  const navigate = useNavigate();
  const isToken = load("admin_token");

  useEffect(() => {
    if (!isToken) {
      navigate("/auth/login");
    }
  }, [isToken, navigate]);

  return <React.Fragment>{children}</React.Fragment>;
};

export default Index;
