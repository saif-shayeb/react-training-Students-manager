import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { StudentsListDispatchContext } from "../contexts/StudentContext";
import CustomInput from "./CustomInput";
import { userSchema } from "../validation/UserValidation";

export function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const validation = userSchema
      .validate(
        {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          bDate: data.bDate,
          pass: data.password,
          passc: data.password2,
          gender: data.gender,
          type: data.type,
        },
        { abortEarly: false },
      )
      .then((data) => console.log(data))
      .catch((e) => console.error(e.errors));
  };

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
                <CustomInput
                  register={register}
                  type="text"
                  name="firstName"
                  placeholder="john"
                  id="first-name"
                  required={false}
                />
              </div>

              <div className="form-group">
                <label htmlFor="last-name">Last Name</label>
                <CustomInput
                  register={register}
                  type="text"
                  name="lastName"
                  placeholder="Doe"
                  id="last-name"
                  required={true}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <CustomInput
                  register={register}
                  type="email"
                  name="email"
                  placeholder="john.doe@example.com"
                  id="email"
                  required={true}
                />
              </div>

              <div className="form-group">
                <label htmlFor="bDate">Date of Birth</label>
                <CustomInput
                  register={register}
                  type="date"
                  name="bDate"
                  id="bDate"
                  required={true}
                />
              </div>
              <div className="form-group">
                <label htmlFor="pass">Password</label>
                <CustomInput
                  register={register}
                  type="password"
                  name="password"
                  id="pass"
                  required={true}
                />
              </div>
              <div className="form-group">
                <label htmlFor="pass2">Confirm Password</label>
                <CustomInput
                  register={register}
                  type="password"
                  name="password2"
                  id="pass2"
                  required={true}
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
