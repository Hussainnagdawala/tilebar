import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ToastProvider({ children }) {
  return (
    <React.Fragment>
      <ToastContainer />
      {children}
    </React.Fragment>
  );
}
