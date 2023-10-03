import React from "react";
import { Formik } from "formik";
import Input from "../components/subcomponents/Input.jsx";
import Button from "../components/subcomponents/Button.jsx";
import { registerSchema } from "../schema/authSchema.js";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div
      className="w-[100%] h-full py-10 bg-fixed"
      style={{
        backgroundImage: `url("https://res.cloudinary.com/djcn6luvw/image/upload/v1696355992/bgimg_l4yxdv.jpg")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <div className="sm:max-w-lg w-full mx-auto border border-1 border-slate-300 p-8 shadow-sm rounded-[4px] bg-slate-100">
        <h1 className="text-3xl text-center font-bold my-5">Sign Up</h1>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={registerSchema}
          onSubmit={(formData, { setSubmitting }) => {
            setSubmitting(true);
            // onSubmit(formData)
            //   .then(({ data: { token, data } }) => {
            //     loginHandler(token, data);
            //     toast.success(`Welcome, ${data.name}`, {
            //       style: { background: "rgb(0,0,0,0.9", color: "white" },
            //     });
            //   })
            //   .catch(
            //     // arrow function with in catch to set message error
            //     ({
            //       response: {
            //         data: { message },
            //       },
            //     }) => setMessage(message)
            //   )
            //   .finally(() => setSubmitting(false));
          }}
        >
          {({ isSubmitting }) => (
            <form className="flex flex-col justify-center gap-4 px-1 mb-3">
              <Input type="text" placeholder="User Name" name="username" />
              <Input type="email" placeholder="Email" name="email" />
              <Input
                type="text"
                placeholder="Password"
                name="password"
                id="password"
              />
              <Input
                type="text"
                placeholder="Confirm Password"
                name="confirmPassword"
                id="confirmPassword"
              />
              {isSubmitting ? (
                <Button type="disabled">Registering...</Button>
              ) : (
                <Button type="submit">Register</Button>
              )}
            </form>
          )}
        </Formik>
        <div className="flex gap-2 items-center ml-1 mt-5">
          <p className="text-sm font-semibold">Already have an account?</p>
          <Link to={"/sign-in"} className="text-blue-700 text-sm font-semibold">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
