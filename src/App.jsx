import "./App.css";
import { useLocalStorage } from "./useLocalStorage";
import { ToastContainer } from "react-toastify";
import React from "react";
import Layout from "./layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  const [studentsList, setStudentsList] = useLocalStorage("studentsList", []);
  const [theme, setTheme] = useLocalStorage("theme", "light");

  React.useEffect(() => {
    document.body.className = theme === "dark" ? "dark-theme" : "";
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Router>
      <ToastContainer />
      <Layout
        studentsList={studentsList}
        setStudentsList={setStudentsList}
        theme={theme}
        toggleTheme={toggleTheme}
      />
    </Router>
  );
}
