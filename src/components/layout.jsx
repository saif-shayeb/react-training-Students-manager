import Sidebar from "./sidebar";
import React, { useState } from "react";

export default function Layout({ children, theme, toggleTheme }) {
    const [open, setOpen] = useState(true);
    const toggle = () => setOpen(!open);

    return (
        <div className="layout">
            <Sidebar
                isOpen={open}
                toggle={toggle}
                theme={theme}
                toggleTheme={toggleTheme}
            />

            <main className="content">
                {children}
            </main>
        </div>
    );
}
