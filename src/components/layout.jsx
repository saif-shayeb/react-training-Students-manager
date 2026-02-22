import Sidebar from "./sidebar";
import React, { useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";

export default function Layout() {
  const [open, setOpen] = useState(true);
  const toggle = () => setOpen(!open);
  const { theme, toggleTheme } = useOutletContext();

  return (
    <div className="layout">
      <Sidebar
        isOpen={open}
        toggle={toggle}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
