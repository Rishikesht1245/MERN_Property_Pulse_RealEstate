import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { signOut } from "../redux/admin/adminSlice";

export default function AdminHeader() {
  const { currentAdmin } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { data } = await axios.get("/api/admin/signout");
    if (data.success === false) {
      dispatch(signOutFailure(data.message));
      return toast.error("something went wrong!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
    dispatch(signOut());
    toast.success(data, {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
    return navigate("/admin/sign-in");
  };

  return (
    <header className="bg-slate-200 shadow-md sticky top-0 z-20">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <NavLink to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Property</span>
            <span className="text-slate-700">Pulse</span>
          </h1>
        </NavLink>

        <ul className="flex gap-6 tracking-wider items-center">
          <li>
            <NavLink
              to="/admin/users"
              className={(navClass) =>
                navClass.isActive
                  ? "text-slate-700 text-[16px]  font-semibold hover:underline"
                  : "text-slate-500 text-[16px] font-semibold hover:underline"
              }
            >
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/listings"
              className={(navClass) =>
                navClass.isActive
                  ? "text-slate-700 text-[16px]  font-semibold  hover:underline"
                  : "text-slate-500 text-[16px] font-semibold hover:underline"
              }
            >
              Listings
            </NavLink>
          </li>
          <li>
            {currentAdmin ? (
              <span
                className="text-slate-500 text-[16px] font-semibold hover:underline"
                onClick={handleSignOut}
              >
                Sign Out
              </span>
            ) : (
              <NavLink
                to="/admin/sign-in"
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
