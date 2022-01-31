import { Navigate } from "react-router";

const ProtectedRoute = ({ check, children }) =>
  check ? children : <Navigate to='/login' />;

export default ProtectedRoute;
