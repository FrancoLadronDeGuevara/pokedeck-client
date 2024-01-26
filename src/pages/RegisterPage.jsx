import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import RegisterForm from "../components/registerForm/RegisterForm";
import { autoCloseAlert } from "../utils/alerts";

const RegisterPage = () => {
    const { isAuthenticated, loading } = useSelector((state) => state.user);

    if(!loading && isAuthenticated) {
        autoCloseAlert('Ya estas logueado', 'warning', 'green')
        return <Navigate to='/' replace />
    }
    
    return (
        <>
            <RegisterForm />
        </>
    )
}

export default RegisterPage;