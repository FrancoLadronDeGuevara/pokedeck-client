import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Pokedeck from "./pages/Pokedeck";
import Store from "./pages/Store";

const routes = [
    {
        path: '/',
        Element: HomePage,
    },
    {
        path: '/register',
        Element: Register,
    },
    {
        path: '/login',
        Element: Login,
    },
    {
        path: '/pokedeck',
        Element: Pokedeck,
    },
    {
        path: '/store',
        Element: Store,
    }
];

export {routes};
