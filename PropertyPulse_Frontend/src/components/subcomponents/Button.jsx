const Button = ({ children, disabled, type, className, onClick }) => {
  return (
    <button
      onClick={() => onClick()}
      type={type}
      disabled={disabled}
      className={`text-sm sm:text-md bg-slate-700 tracking-widest text-white p-3 rounded-lg uppercase hover:opacity-[95%] font-semibold ${className}`}
    >
      {children}
    </button>
  );
};
export default Button;
