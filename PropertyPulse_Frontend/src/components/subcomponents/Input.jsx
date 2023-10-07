import { Field, ErrorMessage } from "formik";

function Input({ name, placeholder, type, className, required }) {
  return (
    <div className={`flex flex-col ${className}`}>
      {placeholder && (
        <label
          htmlFor={name}
          className="text-sm font-bold mb-1 ml-1 tracking-widest text-slate-700"
        >
          {`${placeholder}`}
          {required === undefined ? (
            <span className="text-red-800">*</span>
          ) : (
            <span className="ml-[2px]">:</span>
          )}
        </label>
      )}

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
