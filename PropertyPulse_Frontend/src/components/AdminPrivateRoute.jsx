import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const AdminPrivateRoute = () => {
  const { currentAdmin } = useSelector((state) => state.admin);

  return currentAdmin ? <Outlet /> : <Navigate to={"/admin/sign-in"} />;
};
export default AdminPrivateRoute;
