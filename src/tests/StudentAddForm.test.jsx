import { test, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import React, { useState } from "react";
import StudentAddForm from "../StudentAddForm";
import { useLocalStorage } from "../useLocalStorage";
import {
  StudentsListContext,
  StudentsListDispatchContext,
} from "../StudentContext";

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

import { toast } from "react-toastify";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

function Wrapper() {
  const [studentsList, studentsListDispatch] = useLocalStorage("studentsList", [
    {
      id: "1",
      firstName: "Ahmad",
      lastName: "Khalil",
      birthDate: "2002-05-14",
      gpa: 3.6,
      email: "ahmad@example.com",
    },
  ]);

  return (
    <>
      <StudentsListContext value={studentsList}>
        <StudentsListDispatchContext value={studentsListDispatch}>
          <StudentAddForm />
        </StudentsListDispatchContext>
      </StudentsListContext>

      <div data-testid="students-count">{studentsList.length}</div>
    </>
  );
}

test("adds new student successfully", async () => {
  const user = userEvent.setup();
  render(<Wrapper />);

  await user.type(screen.getByLabelText(/First Name/i), "Saif");
  await user.type(screen.getByLabelText(/Last Name/i), "Shayeb");
  await user.type(screen.getByLabelText(/Email Address/i), "saif@test.com");
  await user.type(screen.getByLabelText(/Date of Birth/i), "2000-01-01");
  await user.type(screen.getByLabelText(/GPA/i), "3.8");

  await user.click(screen.getByRole("button", { name: /Add Student/i }));

  await waitFor(() => {
    expect(toast.success).toHaveBeenCalled();
  });

  expect(screen.getByTestId("students-count")).toHaveTextContent("2");
});

test("shows error when email already exists", async () => {
  const user = userEvent.setup();
  render(<Wrapper />);

  await user.type(screen.getByLabelText(/First Name/i), "Test");
  await user.type(screen.getByLabelText(/Last Name/i), "User");
  await user.type(screen.getByLabelText(/Email Address/i), "ahmad@example.com");
  await user.type(screen.getByLabelText(/Date of Birth/i), "2000-01-01");
  await user.type(screen.getByLabelText(/GPA/i), "3.5");

  await user.click(screen.getByRole("button", { name: /Add Student/i }));

  await waitFor(() => {
    expect(toast.error).toHaveBeenCalled();
  });

  expect(screen.getByTestId("students-count")).toHaveTextContent("2");
});

test("form resets after successful submit", async () => {
  const user = userEvent.setup();
  render(<Wrapper />);

  const firstName = screen.getByLabelText(/First Name/i);
  const lastName = screen.getByLabelText(/Last Name/i);
  const email = screen.getByLabelText(/Email Address/i);
  const birth = screen.getByLabelText(/Date of Birth/i);
  const gpa = screen.getByLabelText(/GPA/i);

  await user.type(firstName, "Saif");
  await user.type(lastName, "Shayeb");
  await user.type(email, "saif2@test.com");
  await user.type(birth, "2000-01-01");
  await user.type(gpa, "3.9");

  await user.click(screen.getByRole("button", { name: /Add Student/i }));

  await waitFor(() => {
    expect(toast.success).toHaveBeenCalled();
  });

  expect(firstName).toHaveValue("");
  expect(lastName).toHaveValue("");
  expect(email).toHaveValue("");
  expect(birth).toHaveValue("");
  expect(gpa).toHaveValue(0);
});
