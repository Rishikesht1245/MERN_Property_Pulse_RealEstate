import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const AdminPrivateRoute = () => {
  const { currentAdmin } = useSelector((state) => state.admin);
  console.log(currentAdmin);

  return currentAdmin ? <Outlet /> : <Navigate to={"/admin/sign-in"} />;
};
export default AdminPrivateRoute;
