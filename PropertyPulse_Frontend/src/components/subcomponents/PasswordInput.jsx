import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { ErrorMessage, Field } from "formik";

const PasswordInput = ({ name, placeholder, className, type, id }) => {
  const [show, setShow] = useState(false);
  return (
    <div className={`${className} flex flex-col`}>
      <label
        htmlFor={name}
        className="text-sm font-bold mb-1 ml-1 tracking-widest text-slate-700"
      >
        {placeholder ? (
          <>
            {`${placeholder}`}
            <span className="text-red-800">*</span>
          </>
        ) : (
          "Update Password"
        )}
      </label>

      {/* Field is provided by Formik to represent input elements */}
      <div className="flex relative">
        <Field
          className="rounded-lg p-3 shadow-sm focus:outline-none w-full"
          id={name}
          name={name}
          placeholder={placeholder ? placeholder : "Update Password"}
          type={show ? "text" : type}
        />
        <span
          className="absolute right-4 top-3 text-[26px] text-slate-700"
          onClick={() => setShow((prev) => !prev)}
        >
          {show ? <AiFillEyeInvisible /> : <AiFillEye />}
        </span>
      </div>

      <span className="m-1 text-sm font-semibold text-red-600">
        <ErrorMessage name={name} />
      </span>
    </div>
  );
};
export default PasswordInput;
