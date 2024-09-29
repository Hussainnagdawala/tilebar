import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";
import Dashboard from "./Components/Dashboard/Dashboard";
import Login from "./Components/Auth/Login";
import ChangePassword from "./Components/Pages/ChangePassword/ChangePassword";
import "./App.css";
import AddSlider from "./Components/Pages/AddSlider/AddSlider";
import AddCategory from "./Components/Pages/AddCategory/AddCategory";
import AddTag from "./Components/Pages/AddTag/AddTag";
import ShopByLook from "./Components/Pages/ShopByLook/ShopByLook";
import Mui from "./Components/Mui/Mui";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const isLoginPage = location.pathname === "/";

  return (
    <div className="App">
      {!isLoginPage && <Navbar toggleSidebar={toggleSidebar} />}
      <div className="app-container">
        {!isLoginPage && <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addslider" element={<AddSlider />} />
            <Route path="/addcategory" element={<AddCategory />} />
            <Route path="/addtag" element={<AddTag />} />
            <Route path="/shopbylook" element={<ShopByLook />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/mui" element={<Mui />} />

          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
