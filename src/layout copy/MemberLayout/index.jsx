import React, { useEffect } from "react";
import { useLocalStorage } from "../../hooks";
import { useNavigate } from "react-router-dom";
// import { useAppSelector } from "@rtk";

const Index = ({ children }) => {
  const { load } = useLocalStorage();
  const navigate = useNavigate();
  // const isSessionExpired = useAppSelector(
  //   (state) => state.auth?.isSessionExpired
  // );
  // const isSessionExpired = true;
  const isToken = load("admin_token");

  useEffect(() => {
    if (!isToken) {
      console.log("inside member layout");
      navigate("/auth/login");
    }
  }, [isToken, navigate]);

  return <React.Fragment>{children}</React.Fragment>;
};

export default Index;
