import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./components/App";
import Layout from "./components/layout";
import Dashboard from "./components/Dashboard";
import StudentAddForm from "./components/StudentAddForm";
import StudentsTable from "./components/StudentsTable";
import Notfound from "./components/Notfound";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="add" element={<StudentAddForm />} />
            <Route path="table" element={<StudentsTable />} />
            <Route path="*" element={<Notfound />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  </StrictMode>,
);
