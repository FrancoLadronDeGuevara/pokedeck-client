import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { autoCloseAlert } from "./utils/alerts";

const AdminRoutes = () => {
    const {user}  = useSelector((state) => state.userState);

    if(user.role !== 'admin') {
        autoCloseAlert('Usuario no autorizado', 'error', 'red')
        return <Navigate to='/' replace/>
    }

    return(
        <Outlet></Outlet>
    )
}

export default AdminRoutes;