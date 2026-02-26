import Sidebar from "./sidebar";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
    const [open, setOpen] = useState(true);
    const toggle = () => setOpen(!open);

    return (
        <div className="layout">
            <Sidebar
                isOpen={open}
                toggle={toggle}
            />

            <main className="content">
                <Outlet />
            </main>
        </div>
    );
}
