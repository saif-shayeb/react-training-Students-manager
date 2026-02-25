import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./components/App";
import Layout from "./components/layout";
import Dashboard from "./components/Dashboard";
import StudentAddForm from "./components/StudentAddForm";
import StudentsTable from "./components/StudentsTable";
import Notfound from "./components/Notfound";

import ErrorBoundary from "./components/ErrorBoundary";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route element={<Layout />}>
            <Route
              index
              element={
                <ErrorBoundary>
                  <Dashboard />
                </ErrorBoundary>
              }
            />
            <Route
              path="add"
              element={
                <ErrorBoundary>
                  <StudentAddForm />
                </ErrorBoundary>
              }
            />
            <Route
              path="table"
              element={
                <ErrorBoundary>
                  <StudentsTable />
                </ErrorBoundary>
              }
            />
            <Route
              path="*"
              element={
                <ErrorBoundary>
                  <Notfound />
                </ErrorBoundary>
              }
            />
          </Route>
        </Route>
      </Routes>
    </Router>
  </StrictMode>,
);
