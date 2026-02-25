import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "../components/App";
import Layout from "../components/layout";
import StudentsTable from "../components/StudentsTable";
import ErrorBoundary from "../components/ErrorBoundary";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App>
            <Layout>
                <ErrorBoundary>
                    <StudentsTable />
                </ErrorBoundary>
            </Layout>
        </App>
    </StrictMode>,
);
