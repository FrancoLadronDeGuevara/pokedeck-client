import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PokedeckPage from "./pages/PokedeckPage";
import StorePage from "./pages/StorePage";

const routes = [
    {
        path: '/',
        Element: HomePage,
    },
    {
        path: '/register',
        Element: RegisterPage,
    },
    {
        path: '/login',
        Element: LoginPage,
    },
    {
        path: '/pokedeck',
        Element: PokedeckPage,
    },
    {
        path: '/store',
        Element: StorePage,
    }
];

export {routes};
