import { useSelector } from "react-redux";
import UserConfiguration from "../components/dashboardUser/configuration/UserConfiguration";
import Loader from "../components/loader/Loader"

const UserConfigurationPage = () => {
    const { loading } = useSelector((state) => state.user);

    return (
        <>
            {loading ?
                <Loader />
                :
                <UserConfiguration />
            }
        </>
    )
}

export default UserConfigurationPage;