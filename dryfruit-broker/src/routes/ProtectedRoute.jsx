import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, role } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/unauthorized" />;

  return children;
};

export default ProtectedRoute;
