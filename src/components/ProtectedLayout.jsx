import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = ({token}) => {
  const isAuthenticated = token;


  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedLayout;
