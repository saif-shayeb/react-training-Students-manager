import "./App.css";
import { useLocalStorage } from "./useLocalStorage";
import { useLocalStorageTheme } from "./localStorageTheme";
import { ToastContainer } from "react-toastify";
import React, { useState } from "react";
import Layout from "./layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  StudentsListContext,
  StudentsListDispatchContext,
} from "./StudentContext";
import { Suspense } from "react";
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
  function Loading() {
    return <h1> Loading...</h1>;
  }
  return (
    <StudentsListContext value={studentsList}>
      <StudentsListDispatchContext value={studentsListDispatch}>
        <Suspense fallback={Loading}>
          <Router>
            <ToastContainer />
            <Suspense fallback={Loading}>
              <Layout theme={theme} toggleTheme={toggleTheme} />
            </Suspense>
          </Router>
        </Suspense>
      </StudentsListDispatchContext>
    </StudentsListContext>
  );
}
