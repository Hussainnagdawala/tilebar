import React from "react";

function Navbar({ toggleSidebar }) {
  return (
    <nav className="navbar">

      <h4 className="navbar-title fw-bold"> <img src="https://i.ibb.co/jL1D25m/mylogo.png" width="180" height="50" /> </h4>
      <button onClick={toggleSidebar} className="toggle-button me-auto ms-2">
        ☰
      </button>
    </nav>
  );
}

export default Navbar;

