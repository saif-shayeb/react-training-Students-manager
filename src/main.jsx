import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./components/App";
import Layout from "./components/layout";
import Dashboard from "./components/Dashboard";
import StudentAddForm from "./components/StudentAddForm";
import StudentsTable from "./components/StudentsTable";
import Notfound from "./components/Notfound";
import StudentDashboard from "./components/StudentDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import Login from "./components/Login";
import { useAuth } from "./contexts/AuthContext";

const DashboardWrapper = () => {
  const { user } = useAuth();
  if (user?.role === "admin") {
    return <Dashboard />
  } else if (user?.role === "student") {
    return <StudentDashboard />
  } else {
    return <Login />
  }
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route element={<Layout />}>
            <Route
              path="login"
              element={
                <ErrorBoundary>
                  <Login />
                </ErrorBoundary>
              }
            />
            <Route
              index
              element={
                <ProtectedRoute>
                  <ErrorBoundary>
                    <DashboardWrapper />
                  </ErrorBoundary>
                </ProtectedRoute>
              }
            />
            <Route
              path="add"
              element={
                <ProtectedRoute>
                  <ErrorBoundary>
                    <StudentAddForm />
                  </ErrorBoundary>
                </ProtectedRoute>
              }
            />
            <Route
              path="table"
              element={
                <ProtectedRoute>
                  <ErrorBoundary>
                    <StudentsTable />
                  </ErrorBoundary>
                </ProtectedRoute>
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
