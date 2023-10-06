import { Formik, Form } from "formik";
import { updateSchema } from "../schema/authSchema";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import axios from "axios";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import Input from "../components/subcomponents/Input";
import PasswordInput from "../components/subcomponents/PasswordInput";
import Button from "../components/subcomponents/Button";
import ShowConfirm from "../components/subcomponents/ShowConfirm";
import Listings from "../components/Listings";

import { app } from "../firebase";
import {
  updateUser,
  deleteUser,
  getAllListings,
} from "../apiRoutes/userRoutes.js";
import {
  updateUserSuccess,
  deleteUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  signOutFailure,
  signOutSuccess,
  signOutStart,
} from "../redux/user/userSlice";

const Profile = () => {
  const { currentUser, sliceError, loading } = useSelector(
    (state) => state.user
  );
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatar);
  const [showListingError, setShowListingError] = useState(false);
  const [showListingLoading, setShowListingLoading] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

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
          setAvatarUrl(downloadURL);
        });
      }
    );
  };

  // handle delete user
  const handleDeleteUser = () => {
    dispatch(deleteUserStart());
    deleteUser(currentUser._id)
      .then(({ data }) => {
        dispatch(deleteUserSuccess(data));
        toast.success(data, {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        return;
      })
      // inside error, response will be there inside it the actual error message sent from backend will see
      .catch(
        ({
          response: {
            data: { message },
          },
        }) => {
          dispatch(deleteUserFailure(message));
        }
      );
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      const { data } = await axios("/api/auth/signout");
      if (data.success === false) {
        dispatch(signOutFailure(data.message));
        return;
      }
      dispatch(signOutSuccess());
      toast.success(data, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  };

  //show all listings
  const handleShowListings = async () => {
    try {
      setShowListingLoading(true);
      setShowListingError(false);

      const { data } = await getAllListings(currentUser._id);
      if (data.success === false) {
        setShowListingError(true);
        setShowListingLoading(false);
        return;
      }
      setUserListings(data);
      setShowListingLoading(false);
    } catch (error) {
      setShowListingError(true);
    }
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
        }}
        validationSchema={updateSchema}
        onSubmit={(formData, { setSubmitting }) => {
          setSubmitting(true);
          updateUser({ ...formData, avatar: avatarUrl }, currentUser._id)
            .then(({ data }) => {
              dispatch(updateUserSuccess(data));
              toast.success("User is Updated Successfully!", {
                style: {
                  borderRadius: "10px",
                  background: "#333",
                  color: "#fff",
                },
              });
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
            {/* api error */}
            {error && (
              <p className="uppercase bg-red-100 tracking-widest text-center w-full rounded-lg p-3 text-[14px] font-bold shadow-sm text-red-500 mb-5">
                {error}
              </p>
            )}
            <Input type="text" placeholder="User Name" name="username" />
            <Input type="email" placeholder="Email" name="email" />
            <PasswordInput type="password" name="password" id="password" />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update"}
            </Button>
            {/* Link to create listing page */}
            <Link
              to={"/create-listing"}
              className="text-sm sm:text-md bg-green-700 tracking-widest text-white p-3 rounded-lg uppercase hover:opacity-[95%] text-center font-semibold"
            >
              Create Listing
            </Link>
          </Form>
        )}
      </Formik>
      <div className="flex justify-between px-1">
        <ShowConfirm
          message={"Are you sure to delete your account ?"}
          handleFunction={handleDeleteUser}
        >
          <span className="text-red-600 font-semibold cursor-pointer tracking-wide">
            {loading ? "Deleting..." : "Delete account"}
          </span>
        </ShowConfirm>

        <span
          className="text-red-600 font-semibold cursor-pointer tracking-wide"
          onClick={handleSignOut}
        >
          Sign out
        </span>
      </div>
      {/* delete error */}
      {sliceError && (
        <p className="uppercase bg-red-100 tracking-widest text-center w-full rounded-lg p-3 text-[14px] font-bold shadow-sm text-red-500 mt-5">
          {sliceError}
        </p>
      )}
      {!userListings ||
        (!userListings.length > 0 && (
          <button
            type="button"
            onClick={handleShowListings}
            className={
              "mt-10 text-green-700 w-full p-3 rounded-lg font-semibold tracking-widest uppercase text-sm sm:text-md bg-green-100"
            }
          >
            {showListingLoading ? "Fetching Listings..." : "Show Listings"}
          </button>
        ))}
      {showListingError ? (
        <p className="text-red-600 font-semibold">Error Showing Listing...</p>
      ) : userListings && userListings.length > 0 ? (
        <Listings
          userListings={userListings}
          setUserListings={setUserListings}
        />
      ) : (
        ""
      )}
    </div>
  );
};
export default Profile;
