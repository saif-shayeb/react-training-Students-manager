import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("admin");

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = role === "admin" ? "Admin" : email.split("@")[0];
        login({ name, email, role });
        navigate("/");
    };

    return (
        <div className="login-container">
            <div className="card login-card" style={{ maxWidth: "400px", margin: "100px auto" }}>
                <h2 style={{ marginBottom: "1.5rem", textAlign: "center" }}>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group" style={{ marginBottom: "1rem" }}>
                        <label>Login As</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="form-control"
                            style={{ width: "100%", padding: "0.5rem", borderRadius: "4px" }}
                        >
                            <option value="admin">Administrator</option>
                            <option value="student">Student</option>
                        </select>
                    </div>

                    <div className="form-group" style={{ marginBottom: "1.5rem" }}>
                        <label>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder={role === "admin" ? "admin@system.com" : "student@example.com"}
                            className="form-control"
                            style={{ width: "100%", padding: "0.5rem", borderRadius: "4px" }}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: "100%", padding: "0.75rem" }}
                    >
                        Login as {role.charAt(0).toUpperCase() + role.slice(1)}
                    </button>
                </form>
            </div>
        </div>
    );
}
