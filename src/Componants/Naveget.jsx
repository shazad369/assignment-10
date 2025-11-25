import { Navigate } from "react-router-dom";

const AuthRedirect = ({ person }) => {
  return person ? <Navigate to="/" /> : <Navigate to="/register" />;
};

export default AuthRedirect;
