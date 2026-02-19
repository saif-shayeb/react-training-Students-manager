import { useContext, useEffect } from "react";
import "./studentAddForm.css";
import { toast } from "react-toastify";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { addStudent, updateStudent } from "./Student";
import {
  StudentsListContext,
  StudentsListDispatchContext,
} from "./StudentContext";
import useForm from "./useForm";

function StudentAddForm({ studentEdit, isEdit, setShow }) {
  const studentsList = useContext(StudentsListContext);
  const dispatch = useContext(StudentsListDispatchContext);

  const initialValues = isEdit
    ? studentEdit
    : {
      id: uuidv4(),
      firstName: "",
      lastName: "",
      birthDate: "",
      gpa: 0,
      email: "",
    };

  const { values, setValues, handleChange, handleSubmit, handleReset } =
    useForm(initialValues, (formData) => {
      if (isEdit) {
        const updated = updateStudent(formData, dispatch, studentsList);
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
        const added = addStudent(formData, dispatch, studentsList);
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
          handleReset({
            id: uuidv4(),
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
    });

  // Update form values if studentEdit changes (e.g. when switching between students to edit)
  useEffect(() => {
    if (isEdit && studentEdit) {
      setValues(studentEdit);
    }
  }, [studentEdit, isEdit, setValues]);

  return (
    <div className="form-container">
      <div className="card">
        <h2 className="form-title">
          {isEdit ? "Edit Student" : "Add New Student"}
        </h2>
        <p className="form-subtitle">
          {isEdit
            ? "Update student information below."
            : "Enter student information below to register them in the system."}
        </p>

        <form className="student-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="first-name">First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="John"
                value={values.firstName}
                onChange={handleChange}
                id="first-name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="last-name">Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Doe"
                value={values.lastName}
                onChange={handleChange}
                id="last-name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="john.doe@example.com"
                value={values.email}
                onChange={handleChange}
                id="email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="bDate">Date of Birth</label>
              <input
                type="date"
                name="birthDate"
                value={values.birthDate}
                onChange={handleChange}
                id="bDate"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="gpa">GPA (0.00 - 4.00)</label>
              <input
                type="number"
                name="gpa"
                value={values.gpa}
                onChange={handleChange}
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
              <button
                type="button"
                className="cancelbtn"
                onClick={() => setShow(false)}
              >
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
