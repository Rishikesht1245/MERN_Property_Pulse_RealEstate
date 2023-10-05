import * as yup from "yup";

export const registerSchema = yup.object().shape({
  username: yup.string().trim().required("Username is Required"),
  email: yup
    .string()
    .trim()
    .required("Email is Required")
    //is valid Email -- unique name , Invalid email -- error , condition
    .test("isValidEmail", "Invalid email", (arg) =>
      /[a-z0-9]+@[a-z0-9]+/i.test(arg)
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required("Email is Required")
    .test("isValidEmail", "Invalid email", (arg) =>
      /[a-z0-9]+@[a-z0-9]+/i.test(arg)
    ),
  password: yup.string().required("Password is Required"),
});

export const updateSchema = yup.object().shape({
  username: yup
    .string()
    .required("User name is required")
    .min(3, "Username must be at least 3 characters long"),
  email: yup
    .string()
    .trim()
    .required("Email is Required")
    .test("isValidEmail", "Invalid email", (arg) =>
      /[a-z0-9]+@[a-z0-9]+/i.test(arg)
    ),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});
