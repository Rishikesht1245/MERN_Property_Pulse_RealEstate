import { Form, Formik } from "formik";
import Input from "../components/subcomponents/Input";
import PasswordInput from "../components/subcomponents/PasswordInput";
import Button from "../components/subcomponents/Button";
import TextArea from "../components/subcomponents/TextArea";
import CheckBox from "../components/subcomponents/CheckBox";
import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const CreateListing = () => {
  const [files, setFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = (e) => {
    //Multiple upload
    if (files.length > 0 && files.length + imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      // multiple image upload
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      // setting uploaded urls to the state and eventually merge it with the formData
      // Promise.all waits for the all the promises to be resolved
      Promise.all(promises)
        .then((urls) => {
          setImageUrls([...imageUrls, ...urls]);
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((error) => {
          setImageUploadError("Image upload failed ! (2 MB max per image");
        });
    } else {
      setUploading(false);
      setImageUploadError("You can only upload 6 images per listing!");
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`upload is ${progress}% done. `);
        },
        (error) => {
          console.log(error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
            resolve(downloadURL)
          );
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setImageUrls(imageUrls.filter((_, idx) => index !== idx));
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="uppercase tracking-widest text-center text-3xl font-semibold my-10">
        Create Listing
      </h1>
      <Formik
        initialValues={{
          name: "",
          description: "",
          address: "",
          sell: false,
          rent: false,
          parking: false,
          furnished: false,
          offer: false,
          bedrooms: 0,
          bathrooms: 0,
          regularPrice: 0,
          discountedPrice: 0,
        }}
        //   validationSchema={registerSchema}
        //   onSubmit={(formData, { setSubmitting }) => {
        //     setSubmitting(true);
        //     console.log(formData);
        //     registerUser(formData)
        //       .then(({ data }) => {
        //         toast.success("Registration Successful!", {
        //           style: {
        //             borderRadius: "10px",
        //             background: "#333",
        //             color: "#fff",
        //           },
        //         });
        //         navigate("/sign-in");
        //         return;
        //       })
        //       // inside error, response will be there inside it the actual error message sent from backend will see
        //       .catch(
        //         ({
        //           response: {
        //             data: { message },
        //           },
        //         }) => {
        //           console.log(message);
        //           setError(message);
        //         }
        //       )

        //       .finally(() => setSubmitting(false));
        //   }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col sm:flex-row justify-center w-[90%] sm:max-w-4xl mx-auto gap-10">
            <div className="flex flex-col gap-2 flex-1 w-full">
              <Input type="text" placeholder="Name" name="name" />
              <TextArea
                type="textarea"
                placeholder="Description"
                name="description"
              />
              <Input type="text" placeholder="Address" name="address" />
              <div className="flex gap-3 flex-wrap">
                <CheckBox name="sale" placeholder={"Sell"} />
                <CheckBox name="rent" placeholder={"Rent"} />
                <CheckBox name="parking" placeholder={"Parking"} />
                <CheckBox name="furnished" placeholder={"Furnished"} />
                <CheckBox name="offer" placeholder={"Offer"} />
              </div>

              <div className="flex gap-5 w-full flex-wrap">
                <Input
                  type="number"
                  placeholder={"Bedrooms"}
                  name="bedrooms"
                  className={"w-[150px]"}
                />
                <Input
                  type="number"
                  placeholder={"Bathrooms"}
                  name="bathrooms"
                  className={"w-[150px]"}
                />
                <Input
                  type="number"
                  placeholder={"Regular Price $/Month"}
                  name="regularPrice"
                  className={"w-[150px] "}
                />
                <Input
                  type="number"
                  placeholder={"Discounted Price $/Month"}
                  name="discountedPrice"
                  className={"w-[150px] "}
                />
              </div>
            </div>
            <div className="flex flex-col flex-1 gap-4">
              <p className="font-semibold">
                Images:
                <span className="font-normal text-gray-600 ml-2">
                  The first image will be the cover max(6)
                </span>
              </p>
              <div className="flex flex-wrap gap-5 mb-5">
                <input
                  className="p-3 border border-gray-300 rounded w-full sm:w-[60%]"
                  type="file"
                  name="images"
                  accept="images/*"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
                <button
                  disabled={uploading}
                  onClick={(e) => handleImageUpload(e)}
                  type="button"
                  className="px-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
                >
                  {uploading ? "Uploading" : "Upload"}
                </button>
              </div>
              <p className="text-red-600 text-sm mt-[-30px] font-semibold">
                {imageUploadError && imageUploadError}
              </p>
              <div className="flex flex-col gap-5">
                {imageUrls.length > 0 &&
                  imageUrls.map((imageUrl, index) => (
                    <div className="flex justify-between p-3 border border-slate-300 items-center shadow-sm">
                      <img
                        src={imageUrl}
                        alt="Listing Image"
                        className="w-[200px] h-[100px]  rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="p-3 text-red-700 font-semibold rounded-ld uppercase hover:opacity-75"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
              </div>
              <Button>Create listing</Button>
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
};
export default CreateListing;
