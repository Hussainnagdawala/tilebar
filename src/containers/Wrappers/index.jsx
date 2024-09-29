// import React from 'react'
import Header from "../Header";
import Sidebar from "../Sidebar";
import { useLocation } from "react-router-dom";
import { globalConstant } from "../../constant";
import { Box } from "@mui/material";
// import { useAppSelector } from "@rtk";
import { AppSpinner } from "../../common";

export const Wrappers = ({ children }) => {
  const location = useLocation();
  const routepath = location.pathname.split("/")[1];
  const showSidebar = globalConstant.USER !== routepath;
  const isSidebarAndHeaderVisible = globalConstant.IS_AUTH_SCREEN !== routepath;
  const isAppLoading = false;
  // const isAppLoading = useAppSelector((state) => state.isAppLoading.isLoading);
  const removePaddingOnUser = routepath === globalConstant.USER;
  return (
    <>
      {isAppLoading && <AppSpinner />}
      <Box>
        {isSidebarAndHeaderVisible && <Header />}
        <Box sx={{ display: "flex", flex: 1 }}>
          {isSidebarAndHeaderVisible && showSidebar && <Sidebar />}
          <Box
            sx={{
              flex: 1,
              overflow: "auto",
              overflowX: "hidden",
              mt: isSidebarAndHeaderVisible ? 18.5 : 0,
              px: isSidebarAndHeaderVisible
                ? { xs: removePaddingOnUser ? 0 : 4, sm: 5.5 }
                : 0,
              pt: isSidebarAndHeaderVisible
                ? { xs: removePaddingOnUser ? 0 : 4, sm: 5.5 }
                : 0,
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
};
