import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CustomInput from "../components/CustomInput";
import { userSchema } from "../validation/UserValidation";
import { InlineError } from "../components/InlineError";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import CustomBtn from "../components/CustomBtn";


const API_URL = import.meta.env.VITE_API_URL;

export function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: {
      type: "student",
      gender: "male"
    }
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const payload = {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        password: data.password,
        type: data.type,
        gender: data.gender,
        birth_date: data.bDate
      };

      await api.post("/auth/register", payload);

      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Registration Error:", error);
      const errorMessage = error.response?.data?.error || error.message;
      toast.error("Registration failed: " + errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container" style={{ padding: "2rem" }}>
      <div className="card" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h2 className="form-title" style={{ textAlign: "center", marginBottom: "1.5rem" }}>Register</h2>

        <form className="student-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label htmlFor="first-name">First Name</label>
              <CustomInput
                register={register}
                type="text"
                name="firstName"
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
                type="text"
                name="lastName"
                placeholder="Doe"
                id="last-name"
              />
              {errors.lastName && (
                <InlineError message={errors.lastName.message} />
              )}
            </div>

            <div className="form-group" style={{ gridColumn: "span 2" }}>
              <label htmlFor="email">Email Address</label>
              <CustomInput
                register={register}
                type="email"
                name="email"
                placeholder="john.doe@example.com"
                id="email"
              />
              {errors.email && <InlineError message={errors.email.message} />}
            </div>

            <div className="form-group">
              <label htmlFor="birthDate">Date of Birth</label>
              <CustomInput
                register={register}
                type="date"
                name="bDate"
                id="birthDate"
              />
              {errors.bDate && <InlineError message={errors.bDate.message} />}
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select {...register("gender")} id="gender" style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid var(--border)", background: "var(--bg-surface)", color: "var(--text-main)" }}>
                <option value="male">male</option>
                <option value="female">female</option>
              </select>
              {errors.gender && (
                <InlineError message={errors.gender.message} />
              )}
            </div>

            <div className="form-group">
              <label htmlFor="pass">Password</label>
              <CustomInput
                register={register}
                type="password"
                name="password"
                placeholder="******"
                id="pass"
              />
              {errors.password && (
                <InlineError message={errors.password.message} />
              )}
            </div>

            <div className="form-group">
              <label htmlFor="pass2">Confirm Password</label>
              <CustomInput
                register={register}
                type="password"
                name="password2"
                placeholder="******"
                id="pass2"
              />
              {errors.password2 && (
                <InlineError message={errors.password2.message} />
              )}
            </div>

            <div className="form-group" style={{ gridColumn: "span 2" }}>
              <label htmlFor="type">User Type</label>
              <select {...register("type")} id="type" style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid var(--border)", background: "var(--bg-surface)", color: "var(--text-main)" }}>
                <option value="admin">admin</option>
                <option value="student">student</option>
              </select>
              {errors.type && <InlineError message={errors.type.message} />}
            </div>
          </div>

          <div className="form-actions" style={{ marginTop: "1.5rem", textAlign: "center" }}>
            <CustomBtn type="submit" disabled={isLoading} width="100%" style={{ background: "var(--secondary)" }} >
              {isLoading ? (
                <div className="btn-content">
                  <AiOutlineLoading3Quarters className="spinner" />
                  <span>Registering...</span>
                </div>
              ) : (
                "Register Account"
              )}
            </CustomBtn>
          </div>
        </form>

        <div style={{ textAlign: "center", borderTop: "1px solid var(--border)", paddingTop: "1rem" }}>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "var(--secondary)", textDecoration: "none", fontWeight: "600" }}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
