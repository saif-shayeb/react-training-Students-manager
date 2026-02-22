import {
  FaBars,
  FaHome,
  FaPlus,
  FaTable,
  FaUser,
  FaUserGraduate,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import { motion } from "framer-motion";
import React from "react";

export default function Sidebar({ isOpen, toggle, theme, toggleTheme }) {
  const menu = [
    { name: "Dashboard", path: "/", icon: <FaHome /> },
    { name: "Add Student", path: "/add", icon: <FaPlus /> },
    { name: "Students Table", path: "/table", icon: <FaTable /> },
  ];

  return (
    <motion.aside
      animate={{ width: isOpen ? 240 : 75 }}
      transition={{ duration: 0.3 }}
      className="sidebar"
    >
      <div className="sidebar-header">
        {isOpen && <h1 className="logo">StudentSys</h1>}

        <button onClick={toggle} className="toggle-btn">
          <FaBars />
        </button>
      </div>

      <nav className="menu">
        {menu.map((item, i) => (
          <NavLink
            key={i}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <span className="icon">{item.icon}</span>
            {isOpen && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button
          onClick={toggleTheme}
          className="theme-toggle-btn"
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          <span className="icon">
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </span>
          {isOpen && (
            <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
          )}
        </button>
      </div>
    </motion.aside>
  );
}
