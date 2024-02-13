import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/loader/Loader";
import Pokedeck from "../components/pokedeck/Pokedeck";
import { getUserDeck } from "../redux/actions/userActions";

const PokedeckPage = () => {
    const dispatch = useDispatch();
    const { loading, isAuthenticated } = useSelector((state) => state.user);

    useEffect(()=>{
        if(isAuthenticated){
            dispatch(getUserDeck())
        }
    }, [isAuthenticated]);

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