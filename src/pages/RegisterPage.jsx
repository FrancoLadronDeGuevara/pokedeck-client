import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/registerForm/RegisterForm";
import { autoCloseAlert } from "../utils/alerts";

const RegisterPage = () => {
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
            <RegisterForm />
        </>
    )
}

export default RegisterPage;