import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { AppSpinner } from "../common/AppSpinner";
const Interceptor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        const AUTH_TOKEN = localStorage.getItem("admin_token");
        const isLogin =
          config.url?.split("/")[config.url?.split("/").length - 1] === "login";

        if (!isLogin && config.headers) {
          config.headers.Authorization = `Bearer ${AUTH_TOKEN}`;
        }

        if (!AUTH_TOKEN) {
          // navigate("/login");
        }

        setIsLoading(true);

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        setIsLoading(false);
        return response;
      },
      (error) => {
        setIsLoading(false);
        if (axios.isAxiosError(error)) {
          if (error.response) {
            if (error.response.status === 401) {
              localStorage.removeItem("access_token");
              navigate("/login");
            } else if (error.response.status === 503) {
              navigate("/login");
              window.location.reload();
            }
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  return (
    <div>
      {isLoading && (
        // <div
        //   style={{
        //     width: "100vw",
        //     height: "100vh",
        //     display: "flex",
        //     justifyContent: "center",
        //     position: "fixed",
        //     alignItems: "center",
        //     zIndex: 50,
        //     background: "rgba(0, 0, 0, 0.2)",
        //   }}
        // >
        //   <Box>
        //     <AppLoader />
        //   </Box>
        // </div>
        <AppSpinner />
      )}
    </div>
  );
};
export default Interceptor;
