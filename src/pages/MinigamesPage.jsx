import {  NavLink, Outlet } from "react-router-dom";

const MinigamesPage = () => {
    return(
        <>
        <h1>Minigames</h1>
        <NavLink to="guesspokemon"> Quien es ese pokemon?</NavLink>
        <Outlet/>
        </>

    )
}

export default MinigamesPage;