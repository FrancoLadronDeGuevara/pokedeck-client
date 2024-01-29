import { useSelector } from "react-redux";

const Pokedeck = () => {
    const {user} = useSelector((state) => state.user)

    return(
        <>
        {user.userDeck.map((card, index) => (
        <img key={index} src={card.cardImage}/>
        )
        )}
        </>
    )
}

export default Pokedeck;