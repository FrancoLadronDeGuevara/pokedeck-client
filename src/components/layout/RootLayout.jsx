import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../../redux/actions/userActions";

const RootLayout = () =>{
    const {isAuthenticated} = useSelector((state) => state.userState)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(isAuthenticated){
            dispatch(getUser())
        }
    }, [])

    return(
        <>
        <div>
            <Navbar/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </div>
        </>
    )
}

export default RootLayout;