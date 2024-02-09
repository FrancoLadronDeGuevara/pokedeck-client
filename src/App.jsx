import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, getUserDeck } from "./redux/actions/userActions";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllCards from "./components/dashboardAdmin/Cards/AllCards";
import CreateCards from "./components/dashboardAdmin/Cards/CreateCards";
import AllChests from "./components/dashboardAdmin/Chests/AllChests";
import CreateChests from "./components/dashboardAdmin/Chests/CreateChests";
import EditGames from "./components/dashboardAdmin/Games/EditGames";
import AllUsers from "./components/dashboardAdmin/Users/AllUsers";
import RootLayout from "./components/layout/RootLayout"
import AdminPage from "./pages/AdminPage";
import Error404Page from "./pages/Error404Page";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PokedeckPage from "./pages/PokedeckPage";
import RegisterPage from "./pages/RegisterPage";
import StorePage from "./pages/StorePage";
import UserConfigurationPage from "./pages/UserConfigurationPage";
import UserProfilePage from "./pages/UserProfilePage";
import AdminRoutes from "./routes/AdminRoutes";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { getAllChests } from "./redux/actions/chestActions";
import GuessPokemonPage from "./pages/Minigames/GuessPokemonPage";

const App = () => {
    const dispatch = useDispatch();
    const {loading, isAuthenticated} = useSelector((state) => state.user)

    useEffect(() => {
        dispatch(getUser())
        dispatch(getAllChests())
        if(isAuthenticated){
            dispatch(getUserDeck())
        }
    }, [isAuthenticated])

    return (
        <BrowserRouter>
            <RootLayout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="*" element={<Error404Page />} />

                    <Route path="/pokedeck" element={
                        <ProtectedRoutes>
                            <PokedeckPage />
                        </ProtectedRoutes>
                    } />

                    <Route path="/store" element={
                        <ProtectedRoutes>
                            <StorePage />
                        </ProtectedRoutes>
                    } />

                    <Route path="/userProfile" element={
                        <ProtectedRoutes>
                            <UserProfilePage />
                        </ProtectedRoutes>
                    } />

                    <Route path="/userConfiguration" element={
                        <ProtectedRoutes>
                            <UserConfigurationPage />
                        </ProtectedRoutes>
                    } />

                    <Route path="/guesspokemon" element={
                        <ProtectedRoutes>
                            <GuessPokemonPage />
                        </ProtectedRoutes>
                    } />

                    <Route path="/admin/*" element={
                        <AdminRoutes>
                            <AdminPage />
                        </AdminRoutes>
                    }>
                        <Route path="cards" element={<CreateCards />} />
                        <Route path="allCards" element={<AllCards />} />
                        <Route path="chests" element={<CreateChests />} />
                        <Route path="allChests" element={<AllChests />} />
                        <Route path="editGames" element={<EditGames />} />
                        <Route path="allUsers" element={<AllUsers />} />
                    </Route>
                </Routes>
            </RootLayout>
        </BrowserRouter>
    )
}

export default App;