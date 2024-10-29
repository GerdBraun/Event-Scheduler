import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Logout = ({ removeToken }) => {
  useEffect(() => {
    removeToken();
  }, []);

  return <Navigate to="/" />;
};

export default Logout;
