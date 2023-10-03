import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Property</span>
            <span className="text-slate-700">Pulse</span>
          </h1>
        </Link>
        <form className="bg-slate-100 px-3 py-2 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64 text-slate-600"
          />
          <button>
            <FaSearch className="text-slate-400 cursor-pointer hover:text-slate-600" />
          </button>
        </form>
        <ul className="flex gap-6">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline font-semibold">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline font-semibold">
              About
            </li>
          </Link>
          <Link to="/profile">
            <li className=" text-slate-700 hover:underline font-semibold">
              Sign in
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
