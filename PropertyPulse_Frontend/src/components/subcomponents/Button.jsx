const Button = ({ children, disabled, type }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className="bg-slate-700 tracking-widest text-white p-3 rounded-lg uppercase hover:opacity-[95%]"
    >
      {children}
    </button>
  );
};
export default Button;
