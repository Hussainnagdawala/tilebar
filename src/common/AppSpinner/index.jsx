import React from "react";
import { Box } from "@mui/material";
import { LoaderSpinner } from "../../assets";
import { style } from "./style";

export const AppSpinner = () => (
  <Box sx={style.loaderBox}>
    <Box>
      <LoaderSpinner />
    </Box>
  </Box>
);
