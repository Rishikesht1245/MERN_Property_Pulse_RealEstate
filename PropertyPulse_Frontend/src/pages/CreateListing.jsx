import { Form, Formik } from "formik";
import Input from "../components/subcomponents/Input";
import PasswordInput from "../components/subcomponents/PasswordInput";
import Button from "../components/subcomponents/Button";
import TextArea from "../components/subcomponents/TextArea";
import CheckBox from "../components/subcomponents/CheckBox";

const CreateListing = () => {
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
            <div className="flex flex-col gap-3 flex-1 w-full">
              <Input type="text" placeholder="Name" name="name" />
              <TextArea
                type="textarea"
                placeholder="Description"
                name="description"
              />
              <Input type="text" placeholder="Address" name="address" />
              <div className="flex gap-2 flex-wrap">
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
                  className={"w-[150px] mt-5 flex"}
                />
                <Input
                  type="number"
                  placeholder={"Bathrooms"}
                  name="bathrooms"
                  className={"w-[150px] mt-5"}
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
                  className="p-3 border border-gray-300 rounded w-full sm:w-[70%]"
                  type="file"
                  name="images"
                  accept="images/*"
                  multiple
                />
                <button className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">
                  Upload
                </button>
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
