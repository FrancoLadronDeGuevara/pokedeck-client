import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/loginForm/LoginForm"
import { autoCloseAlert } from "../utils/alerts";

const LoginPage = () => {
    const navigate = useNavigate()
    const { isAuthenticated } = useSelector((state) => state.userState);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
            autoCloseAlert('Ya estas logueado', 'warning', 'green')
        }
    }, [])

    return (
        <>
            <LoginForm />
        </>
    )
}

export default LoginPage;