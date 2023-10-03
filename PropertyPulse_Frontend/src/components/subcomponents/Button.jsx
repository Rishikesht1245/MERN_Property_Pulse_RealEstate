const Button = ({ children }) => {
  return (
    <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-[95%]">
      {children}
    </button>
  );
};
export default Button;
