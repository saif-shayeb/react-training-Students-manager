import * as yup from "yup";
export const userSchema = yup.object().shape({
  firstName: yup.string().required("first name is required"),
  lastName: yup.string().required("last name is required"),
  email: yup.string().email().required("email is required"),
  bDate: yup
    .date()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value,
    )
    .typeError("please enter a valid date")
    .required("birth date is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(150, "Password must be less than 150 characters")
    .required("password is required"),
  password2: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  gender: yup.string().required("gender is required"),

  type: yup.string().required("user type is required"),
});
