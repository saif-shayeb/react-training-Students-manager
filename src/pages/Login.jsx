import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const trimmedEmail = email.trim();
    try {
      console.log("Searching for user with email:", trimmedEmail);
      const res = await axios.get(`${API_URL}/user`, {
        params: {
          email: trimmedEmail
        }
      });

      console.log("Users found:", res.data);

      const foundUser = res.data.find(u => u.password === password);

      if (foundUser) {
        login(foundUser);
        toast.success(`Login successful as ${foundUser.type}!`);
        navigate("/");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Login failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div
        className="card login-card"
        style={{ maxWidth: "400px", margin: "100px auto" }}
      >
        <h2 style={{ marginBottom: "1.5rem", textAlign: "center" }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="email@example.com"
              className="form-control"
              style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid var(--border)", background: "var(--bg-surface)", color: "var(--text-main)" }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="******"
              className="form-control"
              style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid var(--border)", background: "var(--bg-surface)", color: "var(--text-main)" }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
            style={{ width: "100%", padding: "0.75rem", background: "var(--primary)", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", marginBottom: "1rem" }}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div style={{ textAlign: "center", borderTop: "1px solid var(--border)", paddingTop: "1rem" }}>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "var(--primary)", textDecoration: "none", fontWeight: "600" }}>
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
