import { useContext, useEffect } from "react";
import "../styles/StudentAddForm.css";
import { toast } from "react-toastify";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { StudentsListDispatchContext } from "../contexts/StudentContext";
import useForm from "../hooks/useForm";

function StudentAddForm({ studentEdit, isEdit, setShow }) {
  const { addStudent, updateStudent } = useContext(StudentsListDispatchContext);

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

  const { values, setValues, handleChange, handleSubmit, handleReset, isLoading } =
    useForm(initialValues, async (formData) => {
      const res = isEdit ? await updateStudent(formData) : await addStudent(formData);
      console.log(res);
      if (res.status === "success") {
        toast.success("Student " + (isEdit ? "updated" : "added") + " succesfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        if (!isEdit) {
          handleReset({
            id: uuidv4(),
            firstName: "",
            lastName: "",
            birthDate: "",
            gpa: 0,
            email: "",
          });
        } else {
          setShow(false);
        }
      } else if (res.status === "already exists") {
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
      } else if (res.status === "error") {
        toast.error("error: " + res.message, {
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
    });

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
            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? (
                <div className="btn-content">
                  <AiOutlineLoading3Quarters className="spinner" />
                  <span>{isEdit ? "Updating..." : "Adding..."}</span>
                </div>
              ) : (
                <>{isEdit ? "Update Student" : "Add Student"}</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentAddForm;
