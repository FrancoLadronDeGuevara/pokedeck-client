import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/loader/Loader";
import Pokedeck from "../components/pokedeck/Pokedeck";
import { getUserDeck } from "../redux/actions/userActions";

const PokedeckPage = () => {
    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state.user)

    useEffect(() => {
            dispatch(getUserDeck())
    }, [])

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