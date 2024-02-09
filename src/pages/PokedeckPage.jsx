import { useSelector } from "react-redux";
import Loader from "../components/loader/Loader";
import Pokedeck from "../components/pokedeck/Pokedeck";

const PokedeckPage = () => {
    const { loading } = useSelector((state) => state.user)

    return (
        <>
            {loading ?
                <Loader />
                :
                <Pokedeck />
            }
        </>
    )
}

export default PokedeckPage;