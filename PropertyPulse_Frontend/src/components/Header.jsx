import { FaSearch } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-slate-200 shadow-md sticky top-0 z-20">
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
        <ul className="flex gap-6 tracking-wider items-center">
          <li>
            <NavLink
              to="/"
              className={(navClass) =>
                navClass.isActive
                  ? "text-slate-700 text-[16px] font-semibold hidden sm:inline hover:underline"
                  : "text-slate-500 text-[16px] font-semibold hidden sm:inline hover:underline"
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
                  ? "text-slate-700 text-[16px]  font-semibold hidden sm:inline hover:underline"
                  : "text-slate-500 text-[16px] font-semibold hidden sm:inline hover:underline"
              }
            >
              About
            </NavLink>
          </li>
          <li>
            {currentUser ? (
              <NavLink to="/profile">
                <img
                  className="rounded-full h-9 w-9 object-cover"
                  src={currentUser.avatar}
                  alt=""
                />
              </NavLink>
            ) : (
              <NavLink
                to="/sign-in"
                className={(navClass) =>
                  navClass.isActive
                    ? "text-slate-700  sm:text-[16px] font-semibold hover:underline"
                    : "text-slate-500  sm:text-[16px] font-semibold hover:underline"
                }
              >
                Sign In
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}
