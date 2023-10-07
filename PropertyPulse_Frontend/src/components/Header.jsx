import { FaSearch } from "react-icons/fa";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Header() {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    /* URL SearchParams method is used for getting params present in the url (here we are creating a searchParams with the 
      existing params using window.location.search) */
    const urlParams = new URLSearchParams(window.location.search);
    // // To retrieve all parameter names and values
    // for (const [param, value] of urlParams) {
    //   console.log(`${param}: ${value}`);
    // }

    //only setting the searchTerm query to the entered value, by keeping all other queries with in the url.
    urlParams.set("searchTerm", searchTerm);

    const searchQuery = urlParams.toString();
    // /search will be the page for representing all the routes
    navigate(`/search?${searchQuery}`);
  };

  // this function will change the input in the search box when user modifies the searchTerm Query from the URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-slate-200 shadow-md sticky top-0 z-20">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <NavLink to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Property</span>
            <span className="text-slate-700">Pulse</span>
          </h1>
        </NavLink>
        <form
          className="bg-slate-100 px-3 py-2 rounded-lg flex items-center"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64 text-slate-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">
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
