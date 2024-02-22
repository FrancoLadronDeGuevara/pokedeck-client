import { Box } from "@mui/system";
import { Outlet } from "react-router-dom";
import DashboardAdmin from "../components/dashboardAdmin/DashboardAdmin";

const AdminPage = () => {
  return (
    <>
      <DashboardAdmin />
      <Box sx={{minHeight: 400}}>
        <Outlet />
      </Box>
    </>
  );
};

export default AdminPage;
