import React from "react";
import "./App.css";
import RouterManager from "./routes/RouterManager";
import { Box } from "@mui/material";
import Interceptor from "./api/interceptor";
function App() {
  return (
    <>
      <Box>
        <RouterManager />
        <Interceptor />
      </Box>
    </>
  );
}

export default App;
