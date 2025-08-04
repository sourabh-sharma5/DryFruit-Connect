import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password too short")
    .required("Password is required"),
});

export const signupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email")
    .required("Email is required"),
  userName: Yup.string()
    .min(3, "Username too short")
    .required("Username is required"),
  address: Yup.string()
    .min(10, "Address too short")
    .required("Address is required"),
  password: Yup.string()
    .min(6, "Password too short")
    .required("Password is required"),
});
