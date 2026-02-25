import "../styles/App.css";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useLocalStorageTheme } from "../hooks/localStorageTheme";
import { ToastContainer } from "react-toastify";
import React from "react";
import { StudentsProvider } from "../contexts/StudentContext";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";

function Loading() {
  return (
    <div className="empty-state">
      <div className="loading-content">
        <h1>Loading...</h1>
      </div>
    </div>
  );
}

export default function App() {
  const [studentsList, studentsListDispatch] = useLocalStorage(
    "studentsList",
    [],
  );

  const [theme, setTheme] = useLocalStorageTheme("theme", "light");

  React.useEffect(() => {
    document.body.className = theme === "dark" ? "dark-theme" : "";
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <StudentsProvider>
      <ErrorBoundary>

        <ToastContainer />
        <Outlet context={{ theme, toggleTheme }} />

      </ErrorBoundary>
    </StudentsProvider>
  );
}
