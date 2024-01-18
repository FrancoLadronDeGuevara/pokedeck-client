import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { autoCloseAlert } from "./utils/alerts";

const ProtectedRoutes = () => {
    const { isAuthenticated } = useSelector((state) => state.userState);

    if (!isAuthenticated) {
        autoCloseAlert('Primero debes loguearte', 'error', 'red')
        return <Navigate to='/login' replace />
    }

    return (
        <Outlet></Outlet>
    )
}

export default ProtectedRoutes;