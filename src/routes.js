import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PokedeckPage from "./pages/PokedeckPage";
import StorePage from "./pages/StorePage";
import ItemCards from './components/dashboardAdmin/Cards/ItemCards';
import ItemChests from './components/dashboardAdmin/Chests/ItemChests';
import ItemGames from './components/dashboardAdmin/Games/ItemGames';
import ItemAllCards from './components/dashboardAdmin/Cards/ItemAllCards';
import ItemAllChests from './components/dashboardAdmin/Chests/ItemAllChests';
import ItemAllUsers from './components/dashboardAdmin/Users/ItemAllUsers';
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


const dashboardRoutes = [
    {
        path: 'cards',
        Element: ItemCards,
    },
    {
        path: 'chests',
        Element: ItemChests,
    },
    {
        path: 'games',
        Element: ItemGames,
    },
    {
        path: 'allCards',
        Element: ItemAllCards,
    },
    {
        path: 'allChests',
        Element: ItemAllChests,
    },
    {
        path: 'allUsers',
        Element: ItemAllUsers,
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

export { routes, protectedRoutes, dashboardRoutes };
