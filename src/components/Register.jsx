import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { StudentsListDispatchContext } from "../contexts/StudentContext";

export function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { addStudent, updateStudent } = useContext(StudentsListDispatchContext);

  const onSubmit = (data) => { };

  return (
    <div>
      {" "}
      <div className="form-container">
        <div className="card">
          <h2 className="form-title">Register</h2>

          <form className="student-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="first-name">First Name</label>
                <CustomInput register={register} type="text" name="firstName" placeholder="john" id="first-name" required={true} />
              </div>

              <div className="form-group">
                <label htmlFor="last-name">Last Name</label>
                < CustomInput

                  type="text"
                  name="lastName"
                  placeholder="Doe"
                  id="last-name"

                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="john.doe@example.com"
                  id="email"
                  {...register("email", { required: true })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="bDate">Date of Birth</label>
                <input
                  type="date"
                  name="birthDate"
                  id="bDate"
                  {...register("bDate", { required: true })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="pass">Password</label>
                <input
                  type="password"
                  name="password"
                  id="pass"
                  {...register("password", { required: true })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="pass2">Confirm Password</label>
                <input
                  type="password"
                  name="password2"
                  id="pass2"
                  {...register("password2", { required: true })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select {...register("gender")} id="gender">
                  <option value="female">female</option>
                  <option value="male">male</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="type">user Type</label>
                <select {...register("type")} id="type">
                  <option value="admin">admin</option>
                  <option value="student">student</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">
                {false ? (
                  <div className="btn-content">
                    <AiOutlineLoading3Quarters className="spinner" />
                    <span>{isEdit ? "Updating..." : "Adding..."}</span>
                  </div>
                ) : (
                  <>{true ? "Update Student" : "Add Student"}</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
