import React from "react";
import { useNavigate } from "react-router-dom";

export default function Notfound() {
    const navigate = useNavigate();

    return (
        <div className="details-container">
            <div className="card details-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                <div className="details-main-icon" style={{ fontSize: '5rem' }}>
                    🔍
                </div>
                <h1 style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '0.5rem' }}>404</h1>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Page Not Found</h2>
                <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
                    Oops! The page you are looking for doesn't exist or has been moved to a different URL.
                </p>
                <button className="back-btn" onClick={() => navigate("/")}>
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
}
