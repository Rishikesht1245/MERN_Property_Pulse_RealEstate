import React, { useState } from "react";
import { Form, Formik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import Input from "../../components/subcomponents/Input";
import Button from "../../components/subcomponents/Button.jsx";
import PasswordInput from "../../components/subcomponents/PasswordInput.jsx";

import { loginSchema } from "../../schema/authSchema.js";
import { loginUser } from "../../apiRoutes/adminRoutes.js";

import { useDispatch } from "react-redux";
import { signInSuccess } from "../../redux/admin/adminSlice.js";

const SignIn = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div
      className="w-[100%] h-full py-10 bg-fixed"
      style={{
        backgroundImage: `url("https://res.cloudinary.com/djcn6luvw/image/upload/v1696846031/pexels-tom-fisk-2292073_jgsncg.jpg")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <div className="sm:max-w-lg w-[90%] mx-auto border border-1 border-slate-300 p-8 shadow-sm rounded-[4px] bg-slate-100">
        <h1 className="text-3xl tracking-widest text-center font-bold my-5 uppercase">
          Welcome Admin
        </h1>
        {error && (
          <p className="uppercase bg-red-100 tracking-widest text-center w-full rounded-lg p-3 text-[14px] font-bold shadow-sm text-red-500 mb-5">
            {error}
          </p>
        )}

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={(formData, { setSubmitting }) => {
            setSubmitting(true);
            loginUser(formData)
              .then(({ data }) => {
                dispatch(signInSuccess(data));
                toast.success("Sign In Successful!", {
                  style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                  },
                });
                navigate("/admin/users");
                return;
              })
              // inside error, response will be there inside it the actual error message sent from backend will see
              .catch(
                ({
                  response: {
                    data: { message },
                  },
                }) => {
                  console.log(message);
                  setError(message);
                }
              )

              .finally(() => setSubmitting(false));
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col justify-center gap-4 px-1 mb-3">
              <Input type="email" placeholder="Email" name="email" />
              <PasswordInput
                type="password"
                placeholder="Password"
                name="password"
                id="password"
              />

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Logging In..." : "Login"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignIn;
