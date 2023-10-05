import { Formik, Form } from "formik";
import { registerSchema } from "../schema/authSchema";
import Input from "../components/subcomponents/Input";
import PasswordInput from "../components/subcomponents/PasswordInput";
import Button from "../components/subcomponents/Button";
import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  console.log(avatarUrl);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  // handle File Upload
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      //this call back will work on state change
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setFilePercentage(Math.round(progress));
      },
      // this call back will work when there is an error
      (error) => {
        // Error handling callback
        console.error("Error occurred during upload:", error);
        setFileUploadError(true);
      },
      () => {
        // This callback runs when the upload is complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          setAvatarUrl(downloadURL);
        });
      }
    );
  };

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
          avatar: "",
        }}
        validationSchema={registerSchema}
        onSubmit={(formData, { setSubmitting }) => {
          setSubmitting(true);
          console.log({ ...formData, avatar: avatarUrl });
          // registerUser(formData)
          //   .then(({ data }) => {
          //     toast.success("Registration Successful!", {
          //       style: {
          //         borderRadius: "10px",
          //         background: "#333",
          //         color: "#fff",
          //       },
          //     });
          //     navigate("/sign-in");
          //     return;
          //   })
          //   // inside error, response will be there inside it the actual error message sent from backend will see
          //   .catch(
          //     ({
          //       response: {
          //         data: { message },
          //       },
          //     }) => {
          //       console.log(message);
          //       setError(message);
          //     }
          //   )

          //   .finally(() => setSubmitting(false));
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col justify-center gap-4 px-1 mb-3">
            <input
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <img
              onClick={() => fileRef.current.click()}
              src={avatarUrl || currentUser.avatar}
              alt=""
              className="rounded-full h-24 w-24 object-cover self-center cursor-pointer mt-5"
            />
            <p className="text-center font-semibold text-sm">
              {fileUploadError ? (
                <span className="text-red-600">
                  Error Image Upload (Image must be less than 2MB )
                </span>
              ) : filePercentage > 0 && filePercentage < 100 ? (
                <span className="text-slate-600">{`Uploading Percentage ${filePercentage}`}</span>
              ) : filePercentage === 100 ? (
                <span className="text-green-600">
                  Image Successfully Uploaded
                </span>
              ) : null}
            </p>

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
