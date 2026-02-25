import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "../components/App";
import Layout from "../components/layout";
import StudentAddForm from "../components/StudentAddForm";
import ErrorBoundary from "../components/ErrorBoundary";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App>
            <Layout>
                <ErrorBoundary>
                    <StudentAddForm />
                </ErrorBoundary>
            </Layout>
        </App>
    </StrictMode>,
);
