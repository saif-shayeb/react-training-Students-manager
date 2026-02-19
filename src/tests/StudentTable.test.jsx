import { test, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import StudentsTable from "../studentsTable";
import React, { useState } from "react";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";
import { waitFor } from "@testing-library/react";
import { useLocalStorage } from "../useLocalStorage";
import {
  StudentsListContext,
  StudentsListDispatchContext,
} from "../StudentContext";
//todo fix search test
afterEach(() => {
  cleanup();
});

function Wrapper() {
  const [studentsList, studentsListDispatch] = useLocalStorage("studentsList", [
    {
      id: "3f9c1c3e-7b2e-4e6a-9a1d-5f8b2c4d7e91",
      firstName: "Ahmad",
      lastName: "Khalil",
      birthDate: "2002-05-14",
      gpa: 3.6,
      email: "ahmad@example.com",
    },
    {
      id: "3f9c1c3e-7b2e-4e6a-9a1d-5f8b2c4d7e89",
      firstName: "Mohammad",
      lastName: "Saber",
      birthDate: "2002-05-14",
      gpa: 3.6,
      email: "Mo@example.com",
    },
  ]);

  return (
    <>
      <StudentsListContext value={studentsList}>
        <StudentsListDispatchContext value={studentsListDispatch}>
          <StudentsTable />
        </StudentsListDispatchContext>
      </StudentsListContext>
    </>
  );
}

test("when students added to the list it should appear in the table", async () => {
  render(<Wrapper />);

  expect(
    screen.queryByTestId("3f9c1c3e-7b2e-4e6a-9a1d-5f8b2c4d7e91"),
  ).toBeInTheDocument();
  expect(
    screen.queryByTestId("3f9c1c3e-7b2e-4e6a-9a1d-5f8b2c4d7e91"),
  ).toHaveTextContent(
    "Ahmad KhalilBirth Date2002-05-14Email Addressahmad@example.comGPA3.6",
  );
});

test("delete removes student", async () => {
  const user = userEvent.setup();
  render(<Wrapper />);

  const deleteBtn = screen.getByTestId(
    "3f9c1c3e-7b2e-4e6a-9a1d-5f8b2c4d7e91delete",
  );
  await user.click(deleteBtn);
  await waitFor(() => {
    expect(
      screen.queryByTestId("3f9c1c3e-7b2e-4e6a-9a1d-5f8b2c4d7e91"),
    ).not.toBeInTheDocument();
  });
});
test("search student name should display only the student with this name", async () => {
  const user = userEvent.setup();
  render(<Wrapper />);

  const searchTf = screen.getByTestId("search-test");
  await user.type(searchTf, "Mohammad");
  await waitFor(() => {
    expect(
      screen.queryByTestId("3f9c1c3e-7b2e-4e6a-9a1d-5f8b2c4d7e89"),
    ).toHaveTextContent(
      " NameMohammad SaberBirth Date2002-05-14Email AddressMo@example.comGPA3.6ActionsDelete",
    );
    const tbody = screen.getByTestId("tbody");
    const rows = within(tbody).getAllByRole("row");
    expect(rows).toHaveLength(1); // now only body rows counted
  });
});

test("when user double click the student row it shows the user the details of the student", async () => {
  const user = userEvent.setup();
  render(<Wrapper />);

  const tbody = screen.getByTestId("tbody");
  const rows = within(tbody).getAllByRole("row");
  await user.dblClick(rows[0]);
  await waitFor(() => {
    expect(screen.queryByTestId("details-container")).toBeInTheDocument();
  });
});
