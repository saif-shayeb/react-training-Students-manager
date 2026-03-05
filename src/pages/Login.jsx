import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import CustomBtn from "../components/CustomBtn";

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
    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        email: email.trim(),
        password
      });

      const { access_token } = res.data;
      if (access_token) {
        const base64Url = access_token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const payload = JSON.parse(jsonPayload);
        const userData = {
          id: payload.sub,
          type: payload.type,
          email: email.trim()
        };

        login(userData, access_token);
        toast.success(`Login successful!`);
        navigate("/");
      }
    } catch (error) {
      console.error("Login Error:", error);
      const errorMessage = error.response?.data?.error || error.message;
      toast.error("Login failed: " + errorMessage);
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
              style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid var(--border)", background: "var(--bg-surface)", color: "var(--text-main)" }}
            />
          </div>

          <CustomBtn
            type="submit"
            disabled={isLoading}
            width="100%"
            style={{ background: "var(--primary)" }}
          >
            {isLoading ? "Logging in..." : "Login"}
          </CustomBtn>
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
