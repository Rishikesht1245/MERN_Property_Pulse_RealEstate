import { FaSearch } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  return (
    <header className="bg-slate-200 shadow-md sticky top-0 z-10">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <NavLink to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Property</span>
            <span className="text-slate-700">Pulse</span>
          </h1>
        </NavLink>
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
        <ul className="flex gap-6 tracking-wider">
          <li>
            <NavLink
              to="/"
              className={(navClass) =>
                navClass.isActive
                  ? "text-red-600 text-[16px] font-semibold hidden sm:inline"
                  : "text-black text-[16px] font-semibold hidden sm:inline"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={(navClass) =>
                navClass.isActive
                  ? "text-red-600 text-[16px]  font-semibold hidden sm:inline"
                  : "text-black text-[16px] font-semibold hidden sm:inline"
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sign-in"
              className={(navClass) =>
                navClass.isActive
                  ? "text-red-600  sm:text-[16px] font-semibold"
                  : "text-black  sm:text-[16px] font-semibold"
              }
            >
              Sign In
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}
