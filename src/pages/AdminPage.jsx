import { Container } from "@mui/system";
import { Outlet } from "react-router-dom";
import DashboardAdmin from "../components/dashboardAdmin/DashboardAdmin";

const AdminPage = () => {
    

    return (
        <Container disableGutters sx={{display: 'flex'}}>
            <DashboardAdmin/>
            <Outlet/>
        </Container>
    )
}

export default AdminPage;
