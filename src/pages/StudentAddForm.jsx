import { useContext, useEffect } from "react";
import "../styles/StudentAddForm.css";
import { toast } from "react-toastify";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { StudentsListDispatchContext } from "../contexts/StudentContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "../validation/UserValidation";
import { InlineError } from "../components/InlineError";

function StudentAddForm({ studentEdit, isEdit, setShow }) {
  const { addStudent, updateStudent } = useContext(StudentsListDispatchContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: isEdit
      ? { ...studentEdit, password2: studentEdit.password }
      : {
        id: uuidv4(),
        firstName: "",
        lastName: "",
        birthDate: "",
        gpa: 0,
        email: "",
        gender: "male",
        password: "",
        password2: "",
        type: "student",
      },
  });

  useEffect(() => {
    if (isEdit && studentEdit) {
      reset({ ...studentEdit, password2: studentEdit.password });
    }
  }, [studentEdit, isEdit, reset]);

  const onSubmit = async (data) => {
    const res = isEdit ? await updateStudent(data) : await addStudent(data);
    if (res.status === "success") {
      toast.success("Student " + (isEdit ? "updated" : "added") + " successfully!");
      if (!isEdit) {
        reset({
          id: uuidv4(),
          firstName: "",
          lastName: "",
          birthDate: "",
          gpa: 0,
          email: "",
          gender: "male",
          password: "",
          password2: "",
          type: "student",
        });
      } else {
        setShow(false);
      }
    } else {
      toast.error(res.message || "An error occurred");
    }
  };

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

        <form className="student-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="first-name">First Name</label>
              <input
                {...register("firstName")}
                type="text"
                placeholder="John"
                id="first-name"
              />
              {errors.firstName && <InlineError message={errors.firstName.message} />}
            </div>

            <div className="form-group">
              <label htmlFor="last-name">Last Name</label>
              <input
                {...register("lastName")}
                type="text"
                placeholder="Doe"
                id="last-name"
              />
              {errors.lastName && <InlineError message={errors.lastName.message} />}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                {...register("email")}
                type="email"
                placeholder="john.doe@example.com"
                id="email"
              />
              {errors.email && <InlineError message={errors.email.message} />}
            </div>

            <div className="form-group">
              <label htmlFor="bDate">Date of Birth</label>
              <input
                {...register("birthDate")}
                type="date"
                id="bDate"
              />
              {errors.birthDate && <InlineError message={errors.birthDate.message} />}
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select {...register("gender")} id="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && <InlineError message={errors.gender.message} />}
            </div>

            <div className="form-group">
              <label htmlFor="gpa">GPA (0.00 - 4.00)</label>
              <input
                {...register("gpa", { valueAsNumber: true })}
                type="number"
                id="gpa"
                min={0}
                max={4}
                step={0.01}
              />
              {errors.gpa && <InlineError message={errors.gpa.message} />}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                {...register("password")}
                type="password"
                id="password"
                placeholder="******"
              />
              {errors.password && <InlineError message={errors.password.message} />}
            </div>

            <div className="form-group">
              <label htmlFor="password2">Confirm Password</label>
              <input
                {...register("password2")}
                type="password"
                id="password2"
                placeholder="******"
              />
              {errors.password2 && <InlineError message={errors.password2.message} />}
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
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? (
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
