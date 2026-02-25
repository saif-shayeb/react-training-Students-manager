import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error caught by error boundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="empty-state" style={{ padding: "4rem 1rem", textAlign: "center" }}>
                    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
                        <h2 style={{ color: "var(--danger)", marginBottom: "1rem" }}>Oops! Something went wrong</h2>
                        <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
                            An unexpected error occurred in this section of the application.
                        </p>
                        <button
                            onClick={() => this.setState({ hasError: false })}
                            className="submit-btn"
                            style={{ padding: "0.75rem 1.5rem" }}
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;