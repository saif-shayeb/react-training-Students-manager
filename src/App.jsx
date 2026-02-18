import "./App.css";
import { useLocalStorage } from "./useLocalStorage";
import { ToastContainer } from "react-toastify";
import React from "react";
import Layout from "./layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StudentsListContext } from "./StudentContext";
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
    <StudentsListContext value={studentsList}>
      <Router>
        <ToastContainer />
        <Layout
          setStudentsList={setStudentsList}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      </Router>
    </StudentsListContext>
  );
}
