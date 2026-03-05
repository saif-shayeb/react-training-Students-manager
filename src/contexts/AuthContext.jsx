import React, { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage("user", null);
    const [token, setToken] = useState(localStorage.getItem("access_token"));

    const isAuthenticated = !!token;

    const login = (userData, token) => {
        setUser(userData);
        if (token) {
            localStorage.setItem("access_token", token);
            setToken(token);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("access_token");
        setToken(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
