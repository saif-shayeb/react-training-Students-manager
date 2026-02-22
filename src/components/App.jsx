import "../styles/App.css";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useLocalStorageTheme } from "../hooks/localStorageTheme";
import { ToastContainer } from "react-toastify";
import React from "react";
import Layout from "../components/layout";
import { BrowserRouter as Router } from "react-router-dom";
import {
  StudentsListContext,
  StudentsListDispatchContext,
} from "../contexts/StudentContext";
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
