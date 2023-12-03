import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes
import authService from "../utilities/auth";

function ProtectedRoute({ children }) {
  const isAuthenticated = authService.loggedIn();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} />;
  }

  return children;
}

// Define prop types for the component
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
