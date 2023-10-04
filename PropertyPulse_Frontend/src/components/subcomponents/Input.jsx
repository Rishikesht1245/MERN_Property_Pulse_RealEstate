import { Field, ErrorMessage } from "formik";

function Input({ name, placeholder, type, className }) {
  return (
    <div className={`${className} flex flex-col`}>
      <label
        htmlFor={name}
        className="text-sm font-bold mb-1 ml-1 tracking-widest text-slate-700"
      >
        {`${placeholder}`}
        <span className="text-red-800">*</span>
      </label>

      {/* Field is provided by Formik to represent input elements */}
      <Field
        className="rounded-lg p-3 shadow-sm focus:outline-none w-full"
        id={name}
        name={name}
        placeholder={placeholder}
        type={type}
      />
      <span className="m-1 text-sm font-semibold text-red-600">
        <ErrorMessage name={name} />
      </span>
    </div>
  );
}

export default Input;
