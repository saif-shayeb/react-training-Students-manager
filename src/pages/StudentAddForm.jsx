import React, { useContext, useEffect } from "react";
import "../styles/StudentAddForm.css";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaUserPlus, FaUserEdit } from "react-icons/fa";
import { StudentsListDispatchContext } from "../contexts/StudentContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "../validation/UserValidation";
import { InlineError } from "../components/InlineError";
import CustomInput from "../components/CustomInput";
import CustomBtn from "../components/CustomBtn";

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
      reset({ ...studentEdit, password2: studentEdit.password, bDate: studentEdit.birthDate });
    }
  }, [studentEdit, isEdit, reset]);

  const onSubmit = async (data) => {
    console.log(data);
    const formattedData = { ...data, birthDate: data.bDate };
    const res = isEdit ? await updateStudent(formattedData) : await addStudent(formattedData);
    if (res.status === "success") {
      toast.success(
        "Student " + (isEdit ? "updated" : "added") + " successfully!",
      );
      if (!isEdit) {
        reset({
          firstName: "",
          lastName: "",
          bDate: "",
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{
            width: '3.5rem',
            height: '3.5rem',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--primary-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary)',
            fontSize: '1.5rem'
          }}>
            {isEdit ? <FaUserEdit /> : <FaUserPlus />}
          </div>
          <div>
            <h2 className="form-title" style={{ margin: 0 }}>
              {isEdit ? "Edit Student" : "Add New Student"}
            </h2>
            <p className="form-subtitle" style={{ margin: 0 }}>
              {isEdit
                ? "Update student information below."
                : "Enter student information below to register them in the system."}
            </p>
          </div>
        </div>

        <form className="student-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="first-name">First Name</label>
              <CustomInput
                register={register}
                name="firstName"
                type="text"
                placeholder="John"
                id="first-name"
              />
              {errors.firstName && (
                <InlineError message={errors.firstName.message} />
              )}
            </div>

            <div className="form-group">
              <label htmlFor="last-name">Last Name</label>
              <CustomInput
                register={register}
                name="lastName"
                type="text"
                placeholder="Doe"
                id="last-name"
              />
              {errors.lastName && (
                <InlineError message={errors.lastName.message} />
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <CustomInput
                register={register}
                name="email"
                type="email"
                placeholder="john.doe@example.com"
                id="email"
              />
              {errors.email && <InlineError message={errors.email.message} />}
            </div>

            <div className="form-group">
              <label htmlFor="bDate">Date of Birth</label>
              <CustomInput
                register={register}
                name="bDate"
                type="date"
                id="bDate"
              />
              {errors.bDate && (
                <InlineError message={errors.bDate.message} />
              )}
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
              <CustomInput
                register={register}
                name="gpa"
                registerOptions={{ valueAsNumber: true }}
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
              <CustomInput
                register={register}
                name="password"
                type="password"
                id="password"
                placeholder="******"
              />
              {errors.password && (
                <InlineError message={errors.password.message} />
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password2">Confirm Password</label>
              <CustomInput
                register={register}
                name="password2"
                type="password"
                id="password2"
                placeholder="******"
              />
              {errors.password2 && (
                <InlineError message={errors.password2.message} />
              )}
            </div>
          </div>

          <div className="form-actions">
            {isEdit && (
              <CustomBtn
                type="button"
                onClick={() => setShow(false)}
                danger={true}
              >
                Cancel
              </CustomBtn>
            )}
            <CustomBtn type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="btn-content">
                  <AiOutlineLoading3Quarters className="spinner" />
                  <span>{isEdit ? "Updating..." : "Adding..."}</span>
                </div>
              ) : (
                <>{isEdit ? "Update Student" : "Add Student"}</>
              )}
            </CustomBtn>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentAddForm;
