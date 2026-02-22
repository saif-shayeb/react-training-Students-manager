import "../styles/App.css";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useLocalStorageTheme } from "../hooks/localStorageTheme";
import { ToastContainer } from "react-toastify";
import React from "react";
import {
  StudentsListContext,
  StudentsListDispatchContext,
} from "../contexts/StudentContext";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

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
    <StudentsListContext.Provider value={studentsList}>
      <StudentsListDispatchContext.Provider value={studentsListDispatch}>
        <Suspense fallback={<Loading />}>
          <ToastContainer />
          <Outlet context={{ theme, toggleTheme }} />
        </Suspense>
      </StudentsListDispatchContext.Provider>
    </StudentsListContext.Provider>
  );
}
