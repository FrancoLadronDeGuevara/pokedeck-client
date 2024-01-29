import { useSelector } from "react-redux";
import Loader from "../loader/Loader";

const Pokedeck = () => {

    const { userDeck, loading } = useSelector((state) => state.user)

    return (
        <>
            {loading ?
                <Loader />
                :
                userDeck && userDeck.map((card, index) => (
                    <img key={index} src={card.imageCard} style={{width: 100, height: 150}}/>
                )
                )
            }
        </>
    )
}

export default Pokedeck;