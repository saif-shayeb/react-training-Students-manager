import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import React, { useState } from "react";
import Details from "../details";

afterEach(() => {
  cleanup();
});

function WrapperWithStudent() {
  const [showDetails, setShowDetails] = useState(true);

  const student = {
    id: "1",
    firstName: "Ahmad",
    lastName: "Khalil",
    birthDate: "2002-05-14",
    gpa: 3.6,
    email: "ahmad@example.com",
  };

  return showDetails ? (
    <Details student={student} setShowing={setShowDetails} />
  ) : (
    <div data-testid="closed">Closed</div>
  );
}

function WrapperWithoutStudent() {
  const [showDetails, setShowDetails] = useState(true);

  return showDetails ? (
    <Details student={null} setDetails={setShowDetails} />
  ) : (
    <div data-testid="closed">Closed</div>
  );
}

test("renders student details correctly", async () => {
  render(<WrapperWithStudent />);

  expect(screen.getByTestId("details-container")).toBeInTheDocument();

  expect(screen.getByText("Ahmad Khalil")).toBeInTheDocument();
  expect(screen.getByText("2002-05-14")).toBeInTheDocument();
  expect(screen.getByText("ahmad@example.com")).toBeInTheDocument();
  expect(screen.getByText("3.6")).toBeInTheDocument();
});

test("renders empty state when student is null", async () => {
  render(<WrapperWithoutStudent />);

  await waitFor(() => {
    expect(screen.getByText(/Please select a student/i)).toBeInTheDocument();
  });

  expect(screen.getByText(/Feature Expanding Soon/i)).toBeInTheDocument();
});

test("clicking go back hides the details component", async () => {
  const user = userEvent.setup();
  render(<WrapperWithStudent />);

  const backBtn = screen.getByRole("button", { name: /go back/i });

  await user.click(backBtn);

  await waitFor(() => {
    expect(screen.queryByTestId("details-container")).not.toBeInTheDocument();
    expect(screen.getByTestId("closed")).toBeInTheDocument();
  });
});
