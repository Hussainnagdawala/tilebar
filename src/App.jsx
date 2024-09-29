import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";
import Dashboard from "./Components/Dashboard/Dashboard";
import Login from "./Components/Auth";
import ChangePassword from "./Components/Pages/ChangePassword/ChangePassword";
import "./App.css";
import AddSlider from "./Components/Pages/AddSlider/AddSlider";
import AddCategory from "./Components/Pages/AddCategory/AddCategory";
import AddTag from "./Components/Pages/AddTag/AddTag";
import ShopByLook from "./Components/Pages/ShopByLook/ShopByLook";
import Mui from "./Components/Mui/Mui";
import RouterManager from "./routes/RouterManager";
import { Box } from "@mui/material";
function App() {
  return (
    <>
      <Box>
        <RouterManager />
      </Box>
    </>
  );
}

export default App;
