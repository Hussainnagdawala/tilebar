import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faInfoCircle, faCog, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { IoChevronDownCircleSharp, IoChevronBackCircleSharp } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Import icons for sidebar toggle
import { Link } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi2";


function Sidebar({ isOpen, toggleSidebar }) {
  const [openMenuIndex, setOpenMenuIndex] = useState(null);

  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  return (
    <div className={`sidebar ${isOpen ? "expanded" : "collapsed"}`}>
      {/* Sidebar toggle icon */}
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        <FontAwesomeIcon
          icon={isOpen ? FaChevronLeft : FaChevronRight}
          className="sidebar-toggle-icon"/>
      </div>

      <ul className="menu">
          {/* dashboard */}
          <li className="menu-item bg-warning">
          <Link to="/dashboard" className="menu-link ">
          <i className="nav-icon fas fa-tachometer-alt menu-icon" />
            {isOpen && <span className="menu-text text-dark">Dashboard</span>}
          </Link>
         </li>

          {/* addslider */}
          <li className="menu-item">
              <Link to="/addslider" className="menu-link">
              <i className="fa-solid fa-sliders menu-icon"></i>
                {isOpen && <span className="menu-text">Add Slider</span>}
              </Link>
          </li>

           {/* addcategory */}
           <li className="menu-item">
              <Link to="/addcategory" className="menu-link">
              <i className="fa-solid fa-layer-group menu-icon"></i>
                {isOpen && <span className="menu-text">Add Category</span>}
              </Link>
          </li>

          {/* addtag */}
           <li className="menu-item">
              <Link to="/addtag" className="menu-link">
              <i className="fa-solid fa-tag menu-icon"></i>
                {isOpen && <span className="menu-text">Add Tag</span>}
              </Link>
          </li>

          {/* shopbylook */}
           <li className="menu-item">
              <Link to="/shopbylook" className="menu-link">
              <i className="fa-solid fa-sliders menu-icon"></i>
                {isOpen && <span className="menu-text">ShopByLook</span>}
              </Link>
          </li>
          {/* shopbylook */}
           <li className="menu-item">
              <Link to="/mui" className="menu-link">
              <i className="fa-solid fa-sliders menu-icon"></i>
                {isOpen && <span className="menu-text">Mui</span>}
              </Link>
          </li>
          {/* changepassword */}
            <li className="menu-item">
              <Link to="/changepassword" className="menu-link">
                <i className="nav-icon fa fa-key menu-icon" />
                {isOpen && <span className="menu-text">Change Password</span>}
              </Link>
           </li>

           {/* Logout */}
           <li className="menu-item">
           <Link to="/" className="menu-link">
           <i className="fa-solid fa-right-from-bracket menu-icon"></i>
                {isOpen && <span className="menu-text">Logout</span>}
                </Link>
           </li>
      </ul>
    </div>
  );
}
export default Sidebar;
