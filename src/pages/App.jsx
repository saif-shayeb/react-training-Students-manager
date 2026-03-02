import "../styles/App.css";
import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { StudentsProvider } from "../contexts/StudentContext";
import { ThemeProvider } from "../contexts/ThemeContext";
import { AuthProvider } from "../contexts/AuthContext";
import ErrorBoundary from "../components/ErrorBoundary";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <StudentsProvider>
          <ErrorBoundary>
            <ToastContainer />
            <Outlet />
          </ErrorBoundary>
        </StudentsProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
