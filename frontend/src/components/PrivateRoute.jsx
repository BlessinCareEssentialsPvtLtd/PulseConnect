// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const PrivateRoute = ({ children, allowedRoles }) => {
    const { token, role } = useAuth();
    if (!token) return <Navigate to="/" />;
    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" />;
    }
    return children;
};

export default PrivateRoute;
