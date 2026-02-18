import { test, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import React from "react";
import App from "../App";
import { motion } from "framer-motion";

vi.mock("react-toastify", () => ({
  ToastContainer: () => <div />,
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("../useLocalStorage", () => ({
  useLocalStorage: (key, initialValue) => {
    const React = require("react");
    return React.useState(initialValue);
  },
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

test("renders dashboard by default", async () => {
  render(<App />);

  expect(screen.getByText(/Dashboard Overview/i)).toBeInTheDocument();
  expect(screen.getByText(/Total Students/i)).toBeInTheDocument();
  expect(screen.getByText(/Average GPA/i)).toBeInTheDocument();
});

test("navigates to Add Student page", async () => {
  const user = userEvent.setup();
  render(<App />);

  const addLink = screen.getByText(/Add Student/i);
  await user.click(addLink);

  await waitFor(() => {
    expect(screen.getByText(/Add New Student/i)).toBeInTheDocument();
  });
});

test("theme toggle changes body class", async () => {
  const user = userEvent.setup();
  render(<App />);

  const themeBtn = screen.getByTitle(/Switch to dark mode/i);

  await user.click(themeBtn);

  await waitFor(() => {
    expect(document.body.className).toBe("dark-theme");
  });
});
