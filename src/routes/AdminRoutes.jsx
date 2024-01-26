import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoutes = ({ children }) => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);

    if (loading === false) {
        if (!isAuthenticated) {
            return <Navigate to="/login" replace />;
        }else if(user && user.role !== 'admin'){
            return <Navigate to="/" replace />
        }
    }
    return children;
};


export default AdminRoutes;