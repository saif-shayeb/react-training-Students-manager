import {
    FaBars,
    FaHome,
    FaPlus,
    FaTable,
    FaUserGraduate,
    FaSun,
    FaMoon,
} from "react-icons/fa";
import { motion } from "framer-motion";
import React from "react";

export default function Sidebar({ isOpen, toggle, theme, toggleTheme }) {
    const menu = [
        { name: "Dashboard", path: "/index.html", icon: <FaHome /> },
        { name: "Add Student", path: "/add.html", icon: <FaPlus /> },
        { name: "Students Table", path: "/table.html", icon: <FaTable /> },
    ];

    const currentPath = window.location.pathname;

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
                {menu.map((item, i) => {
                    const isActive = currentPath === item.path || (item.path === "/index.html" && currentPath === "/");
                    return (
                        <a
                            key={i}
                            href={item.path}
                            className={isActive ? "menu-item active" : "menu-item"}
                        >
                            <span className="icon">{item.icon}</span>
                            {isOpen && <span>{item.name}</span>}
                        </a>
                    );
                })}
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
