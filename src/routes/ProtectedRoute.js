import { Navigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth);

  if(!auth.isAuthenticated) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};

export const PublicRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth);
 
  if(auth.isAuthenticated) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;

}