import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoginForm from "../components/loginForm/LoginForm"
import { autoCloseAlert } from "../utils/alerts";

const LoginPage = () => {
    const { isAuthenticated, loading } = useSelector((state) => state.user);

    if(!loading && isAuthenticated) {
        autoCloseAlert('Ya estas logueado', 'warning', 'green')
        return <Navigate to='/' replace />
    }

    return (
        <>
            <LoginForm />
        </>
    )
}

export default LoginPage;