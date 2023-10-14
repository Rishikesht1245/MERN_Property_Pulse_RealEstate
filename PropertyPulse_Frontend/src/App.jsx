import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import SingleListing from "./pages/SingleListing";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import { Footer } from "./components/Footer";
import Messenger from "./pages/Messenger";

import AdminSignIn from "./pages/admin/SignIn";
import AdminHeader from "./components/AdminHeader";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import Users from "./pages/admin/Users";
import Listing from "./pages/admin/Listing";

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      {isAdmin ? <AdminHeader /> : <Header />}
      <Routes>
        {/* user Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route
            path="/update-listing/:listingId"
            element={<UpdateListing />}
          />
          <Route path="/chats" element={<Messenger />} />
        </Route>

        {/* search */}
        <Route path="/listing/:listingId" element={<SingleListing />} />
        <Route path="/search" element={<Search />} />
        <Route path="/*" element={<NotFound />} />

        {/* admin Routes */}
        <Route path="/admin/sign-in" element={<AdminSignIn />} />
        <Route element={<AdminPrivateRoute />}>
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/listings" element={<Listing />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}
