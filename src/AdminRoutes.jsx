import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { autoCloseAlert } from "./utils/alerts";

const AdminRoutes = ({children}) => {
    const {user, isAuthenticated}  = useSelector((state) => state.userState);

    if (!isAuthenticated) {
        autoCloseAlert('Primero debes loguearte', 'error', 'red')
        return <Navigate to='/login' replace />
    }else if(user.role !== 'admin') {
        autoCloseAlert('Usuario no autorizado', 'error', 'red')
        return <Navigate to='/' replace/>
    }

    return children
}

export default AdminRoutes;