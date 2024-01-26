import { Outlet } from "react-router-dom";
import DashboardAdmin from "../components/dashboardAdmin/DashboardAdmin";


const AdminPage = () => {

    return (
        <>
            <DashboardAdmin/>
            <Outlet/>
        </>
    )
}

export default AdminPage;
