import { Formik, Form } from "formik";
import { registerSchema } from "../schema/authSchema";
import Input from "../components/subcomponents/Input";
import PasswordInput from "../components/subcomponents/PasswordInput";
import Button from "../components/subcomponents/Button";
import { useSelector } from "react-redux";
const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="sm:max-w-lg w-[90%] mx-auto my-10">
      <h1 className="uppercase tracking-widest text-center text-3xl font-semibold my-5">
        Profile
      </h1>
      <Formik
        initialValues={{
          username: currentUser.username,
          email: currentUser.email,
          password: "",
          confirmPassword: "",
        }}
        validationSchema={registerSchema}
        onSubmit={(formData, { setSubmitting }) => {
          setSubmitting(true);
          console.log(formData);
          registerUser(formData)
            .then(({ data }) => {
              toast.success("Registration Successful!", {
                style: {
                  borderRadius: "10px",
                  background: "#333",
                  color: "#fff",
                },
              });
              navigate("/sign-in");
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
            <img
              src={currentUser.avatar}
              alt=""
              className="rounded-full h-24 w-24 object-cover self-center cursor-pointer my-5"
            />
            <Input type="text" placeholder="User Name" name="username" />
            <Input type="email" placeholder="Email" name="email" />
            <PasswordInput
              type="password"
              placeholder="Update Password"
              name="password"
              id="password"
            />

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update"}
            </Button>
          </Form>
        )}
      </Formik>
      <div className="flex justify-between px-1">
        <span className="text-red-600 font-semibold cursor-pointer tracking-wide">
          Delete account
        </span>
        <span className="text-red-600 font-semibold cursor-pointer tracking-wide">
          Sign out
        </span>
      </div>
    </div>
  );
};
export default Profile;
