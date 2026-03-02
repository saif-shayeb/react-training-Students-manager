import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./pages/App";
import Layout from "./components/layout";
import Dashboard from "./pages/Dashboard";
import StudentAddForm from "./pages/StudentAddForm";
import StudentsTable from "./pages/StudentsTable";
import Notfound from "./pages/Notfound";
import StudentDashboard from "./pages/StudentDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import Login from "./pages/Login";
import { useAuth } from "./contexts/AuthContext";
import { Register } from "./pages/register";

const DashboardWrapper = () => {
  const { user } = useAuth();
  if (user?.role === "admin") {
    return <Dashboard />;
  } else if (user?.role === "student") {
    return <StudentDashboard />;
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
              path="register"
              element={
                <ErrorBoundary>
                  <Register />
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
