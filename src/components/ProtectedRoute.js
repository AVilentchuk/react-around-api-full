import { Navigate } from "react-router";
import { useEffect } from "react";
import * as auth from "../utils/auth";

const ProtectedRoute = ({ check, children }) =>
  !check ? <Navigate to='/login' /> : children;

export default RequireAuth;
function RequireAuth({ children, redirectTo, check }) {
  let isAuthenticated = check;

  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}
