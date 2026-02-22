import { test, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import React from "react";
import App from "../components/App";
import Layout from "../components/layout";
import Dashboard from "../components/Dashboard";
import StudentAddForm from "../components/StudentAddForm";
import StudentsTable from "../components/StudentsTable";
import { MemoryRouter, Routes, Route } from "react-router-dom";

vi.mock("react-toastify", () => ({
  ToastContainer: () => <div />,
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}));

vi.mock("../hooks/useLocalStorage", () => ({
  useLocalStorage: (key, initialValue) => {
    return [initialValue, vi.fn()];
  },
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

const renderApp = (initialRoute = "/") => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="add" element={<StudentAddForm />} />
            <Route path="table" element={<StudentsTable />} />
          </Route>
        </Route>
      </Routes>
    </MemoryRouter>
  );
};

test("renders dashboard by default", async () => {
  renderApp();

  expect(screen.getByText(/Dashboard Overview/i)).toBeInTheDocument();
  expect(screen.getByText(/Total Students/i)).toBeInTheDocument();
  expect(screen.getByText(/Average GPA/i)).toBeInTheDocument();
});

test("navigates to Add Student page", async () => {
  const user = userEvent.setup();
  renderApp();

  const addLink = screen.getByText(/Add Student/i);
  await user.click(addLink);

  await waitFor(() => {
    expect(screen.getByText(/Add New Student/i)).toBeInTheDocument();
  });
});

test("theme toggle changes body class", async () => {
  const user = userEvent.setup();
  renderApp();

  const themeBtn = screen.getByTitle(/Switch to dark mode/i);

  await user.click(themeBtn);

  await waitFor(() => {
    expect(document.body.className).toBe("dark-theme");
  });
});
