import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PokedeckPage from "./pages/PokedeckPage";
import StorePage from "./pages/StorePage";
import AdminPage from "./pages/AdminPage";
import UserProfilePage from "./pages/UserProfilePage";
import UserConfigurationPage from "./pages/UserConfigurationPage";

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
    
];

const adminRoutes = [
    {
        path: '/dashboard',
        Element: AdminPage,
    },
]

const protectedRoutes = [
    {
        path: '/pokedeck',
        Element: PokedeckPage,
    },
    {
        path: '/store',
        Element: StorePage,
    },
    {
        path: '/userProfile',
        Element: UserProfilePage,
    },
    {
        path: '/userConfiguration',
        Element: UserConfigurationPage,
    },
]

export { routes, adminRoutes, protectedRoutes };
