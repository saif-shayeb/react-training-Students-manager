import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CustomInput from "../components/CustomInput";
import { userSchema } from "../validation/UserValidation";
import { InlineError } from "../components/InlineError";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

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
      const id = uuidv4();
      const userData = {
        id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        birthDate: data.birthDate,
        gender: data.gender,
        type: data.type,
        password: data.password
      };

      const checkUser = await axios.get(`${API_URL}/user?email=${data.email}`);
      if (checkUser.data.length > 0) {
        toast.error("Email already exists. Please use a different email.");
        setIsLoading(false);
        return;
      }

      await axios.post(`${API_URL}/user`, userData);

      if (data.type === "student") {
        const studentData = {
          id,
          gpa: 0
        };
        await axios.post(`${API_URL}/student`, studentData);
      }

      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      toast.error("Registration failed: " + error.message);
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
                name="birthDate"
                id="birthDate"
              />
              {errors.birthDate && <InlineError message={errors.birthDate.message} />}
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
            <button type="submit" className="submit-btn" disabled={isLoading} style={{ width: "100%", padding: "0.75rem", background: "var(--secondary)", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", marginBottom: "1rem" }}>
              {isLoading ? (
                <div className="btn-content">
                  <AiOutlineLoading3Quarters className="spinner" />
                  <span>Registering...</span>
                </div>
              ) : (
                "Register Account"
              )}
            </button>
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
