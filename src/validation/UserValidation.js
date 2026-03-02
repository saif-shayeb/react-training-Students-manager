import * as yup from "yup";
export const userSchema = yup.object().shape({
  firstName: yup.string().required("this field is required"),
  lastName: yup.string().required("this field is required"),
  email: yup.string().email().required("this field is required"),
  bDate: yup.date().required("this field is required"),
  Pass: yup.string().min(6).max(150).required("this field is required"),
  passc: yup.string().oneOf([yup.ref("pass"), "passwords must match"]),
  gender: yup.string().equals(["female", "male"]),
  type: yup.string().equals(["admin", "student"]),
});
