import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { autoCloseAlert } from "./utils/alerts";

const ProtectedRoutes = () => {
    const { user } = useSelector((state) => state.userState);

    if (!user) {
        autoCloseAlert('Primero debes loguearte', 'error', 'red')
        return <Navigate to='/login' replace />
    }

    return (
        <Outlet></Outlet>
    )
}

export default ProtectedRoutes;