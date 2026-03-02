import {
  FaBars,
  FaHome,
  FaPlus,
  FaTable,
  FaSun,
  FaMoon,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";

export default function Sidebar({ isOpen, toggle }) {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const isAdmin = user?.type === "admin";

  const menu = [{ name: "Dashboard", path: "/", icon: <FaHome /> }];

  if (isAdmin) {
    menu.push(
      { name: "Add Student", path: "/add", icon: <FaPlus /> },
      { name: "Students Table", path: "/table", icon: <FaTable /> },
    );
  }

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

        <button
          onClick={logout}
          className="theme-toggle-btn"
          style={{ marginTop: "0.5rem", color: "var(--danger)" }}
          title="Logout"
        >
          <span className="icon">
            <FaSignOutAlt />
          </span>
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
}
