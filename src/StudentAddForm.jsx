import { useState } from "react";
import "./studentAddForm.css";
import { toast } from "react-toastify";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import deleteStudent, { addStudent, updateStudent } from "./Student";

function StudentAddForm({
  studentsList,
  setStudentsList,
  studentEdit,
  isEdit,
  setShow,
}) {
  const [student, setStudent] = useState(
    isEdit
      ? studentEdit
      : {
          id: uuidv4(),
          firstName: "",
          lastName: "",
          birthDate: "",
          gpa: 0,
          email: "",
        },
  );
  console.log(student);
  function handleSubmit() {
    if (isEdit) {
      const updated = updateStudent(student, setStudentsList, studentsList);
      if (updated) {
        toast.success("Student updated succesfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setShow(false);
      } else {
        toast.error("already exists a student with the same email", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      const added = addStudent(student, studentsList, setStudentsList);
      if (added) {
        toast.success("Student added succesfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setStudent({
          firstName: "",
          lastName: "",
          birthDate: "",
          gpa: 0,
          email: "",
        });
      } else {
        toast.error("already exists!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  }
  return (
    <div className="form-container">
      <div className="card">
        <h2 className="form-title">Add New Student</h2>
        <p className="form-subtitle">
          Enter student information below to register them in the system.
        </p>

        <form
          className="student-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="first-name">First Name</label>
              <input
                type="text"
                placeholder="John"
                value={student.firstName}
                onChange={(e) =>
                  setStudent({ ...student, firstName: e.target.value })
                }
                id="first-name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="last-name">Last Name</label>
              <input
                type="text"
                placeholder="Doe"
                value={student.lastName}
                onChange={(e) => {
                  setStudent({ ...student, lastName: e.target.value });
                }}
                id="last-name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                placeholder="john.doe@example.com"
                value={student.email}
                onChange={(e) =>
                  setStudent({ ...student, email: e.target.value })
                }
                id="email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="bDate">Date of Birth</label>
              <input
                type="date"
                value={student.birthDate}
                onChange={(e) =>
                  setStudent({ ...student, birthDate: e.target.value })
                }
                id="bDate"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="gpa">GPA (0.00 - 4.00)</label>
              <input
                type="number"
                value={student.gpa}
                onChange={(e) =>
                  setStudent({ ...student, gpa: e.target.value })
                }
                id="gpa"
                min={0}
                max={4}
                step={0.01}
                required
              />
            </div>
          </div>

          <div className="form-actions">
            {isEdit && (
              <button className="cancelbtn" onClick={() => setShow(false)}>
                Cancel
              </button>
            )}
            <button type="submit" className="submit-btn">
              {isEdit ? "Update Student" : "Add Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default StudentAddForm;
