import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Pokedeck from "../components/pokedeck/Pokedeck";
import { getUserDeck } from "../redux/actions/userActions";

const PokedeckPage = ()=>{
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(getUserDeck())
    }, [])

    return(
        <>
        <h1>Pokedeck</h1>
        <Pokedeck/>
        </>
    )
}

export default PokedeckPage;