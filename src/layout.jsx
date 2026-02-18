import Details from "./details";
import Sidebar from "./sidebar";
import StudentsTable from "./studentsTable";
import StudentAddForm from "./StudentAddForm";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
export default function Layout({
  studentsList,
  setStudentsList,
  theme,
  toggleTheme,
}) {
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
          <Route path="/" element={<Dashboard studentsList={studentsList} />} />
          <Route
            path="/add"
            element={
              <StudentAddForm
                studentsList={studentsList}
                setStudentsList={setStudentsList}
              />
            }
          />
          <Route
            path="/table"
            element={
              <StudentsTable
                studentsList={studentsList}
                setStudentsList={setStudentsList}
              />
            }
          />
          <Route
            path="/details"
            element={<Details student={studentsList[0]} />}
          />
        </Routes>
      </main>
    </div>
  );
}
