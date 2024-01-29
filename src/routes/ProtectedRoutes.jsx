import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { autoCloseAlert } from "../utils/alerts";

const ProtectedRoutes = ({ children }) => {
    const { loading, isAuthenticated } = useSelector((state) => state.user);
    
    if (loading === false) {
        if (!isAuthenticated) {
            autoCloseAlert('Primero debes loguearte', 'warning', '#F56903' )
            return <Navigate to="/login" replace />;
        }
    }
    return children;
};

export default ProtectedRoutes;