import Sidebar from "./sidebar";
import StudentsTable from "./StudentsTable";
import StudentAddForm from "./StudentAddForm";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
export default function Layout({ setStudentsList, theme, toggleTheme }) {
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
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/add"
            element={<StudentAddForm setStudentsList={setStudentsList} />}
          />
          <Route
            path="/table"
            element={<StudentsTable setStudentsList={setStudentsList} />}
          />
        </Routes>
      </main>
    </div>
  );
}
