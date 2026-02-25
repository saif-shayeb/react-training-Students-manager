import "../styles/App.css";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useLocalStorageTheme } from "../hooks/localStorageTheme";
import { ToastContainer } from "react-toastify";
import React from "react";
import { StudentsProvider } from "../contexts/StudentContext";
import ErrorBoundary from "./ErrorBoundary";

export default function App({ children }) {
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
                {React.Children.map(children, child => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, { theme, toggleTheme });
                    }
                    return child;
                })}
            </ErrorBoundary>
        </StudentsProvider>
    );
}
