import * as yup from "yup";
export const userSchema = yup.object().shape({
  firstName: yup.string().required("first name is required"),
  lastName: yup.string().required("last name is required"),
  email: yup.string().email().required("email is required"),
  birthDate: yup
    .string()
    .required("birth date is required"),

  type: yup.string().required("user type is required"),
  gender: yup.string().required("gender is required"),
  password: yup.string().min(6, "password must be at least 6 characters").required("password is required"),
  password2: yup
    .string()
    .oneOf([yup.ref("password"), null], "passwords must match")
    .required("confirm password is required"),
});
