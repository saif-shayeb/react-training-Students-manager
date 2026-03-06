import "../styles/App.css";
import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { StudentsProvider } from "../contexts/StudentContext";
import { ThemeProvider } from "../contexts/ThemeContext";
import { AuthProvider } from "../contexts/AuthContext";
import { CourseProvider } from "../contexts/CourseContext";
import ErrorBoundary from "../components/ErrorBoundary";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <StudentsProvider>
          <CourseProvider>
            <ErrorBoundary>
              <ToastContainer />
              <Outlet />
            </ErrorBoundary>
          </CourseProvider>
        </StudentsProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
