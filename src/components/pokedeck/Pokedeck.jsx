import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

const Pokedeck = () => {
    const { userDeck } = useSelector((state) => state.user)

    return (
        <>
            {
                userDeck?.length == 0 ?
                    <Typography variant="h2">
                        Todavia no tienes cartas
                    </Typography>
                    :
                    userDeck?.map((card, index) => (
                        <img key={index} src={card.imageCard} style={{ width: 100, height: 150 }} />
                    )
                    )
            }

        </>
    )
}

export default Pokedeck;