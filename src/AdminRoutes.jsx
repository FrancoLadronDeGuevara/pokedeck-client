import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { autoCloseAlert } from "./utils/alerts";

const AdminRoutes = ({children}) => {
    const {user}  = useSelector((state) => state.userState);

    if(user.role !== 'admin') {
        autoCloseAlert('Usuario no autorizado', 'error', 'red')
        return <Navigate to='/' replace/>
    }

    return children
}

export default AdminRoutes;