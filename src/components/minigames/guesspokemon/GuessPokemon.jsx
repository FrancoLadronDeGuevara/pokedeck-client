import { Box, Button, Container, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import buttonAnimation from "../../../assets/ButtonAnimation/pokeballbutton.json"
import { getRandomPokemon } from "./game";
import pokemonTitleImage from "../../../assets/images/pokemon.png"
import questionImage from "../../../assets/images/who.png"
import "./GuessPokemon.css"
import { useDispatch } from "react-redux";
import { getCoins } from "../../../redux/actions/userActions";
import { autoCloseAlert } from "../../../utils/alerts";


const containerStyle = {
    position: 'relative',
    backgroundRepeat: 'round',
    backgroundSize: 'cover',
    height: '80vh',
}


const GuessPokemon = () => {
    const dispatch = useDispatch();
    const [pokemonName, setPokemonName] = useState('')
    const [randomPokemon, setRandomPokemon] = useState(null);
    const [filter, setFilter] = useState(true);

    useEffect(() => {
        startGame();
    }, []);

    const startGame = () => {
        getRandomPokemon()
            .then(pokemon => {
                if (pokemon) {
                    setRandomPokemon(pokemon);
                    setFilter(true);
                } else {
                    console.error('No se pudo obtener un Pokémon aleatorio.');
                }
            })
            .catch(error => {
                console.error('Error en la API:', error);
            });
    }

    const handleGuess = (e) => {
        e.preventDefault()

        const data = { id: randomPokemon.id, pokemonName }
        console.log
        try {
            dispatch(getCoins(data))
                .then((res) => {
                    if (res.error) {
                        autoCloseAlert(res.error.message, 'error', 'red')
                    } else {
                        autoCloseAlert('10 monedas', 'success', 'green')
                        setFilter(false)
                    }
                    setPokemonName('');
                    setTimeout(() => {
                        startGame();
                    }, 2000)
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Container maxWidth={false} disableGutters style={containerStyle} sx={{ backgroundImage: { xs: 'url(https://res.cloudinary.com/dnlvoza12/image/upload/v1706688671/fxvlwd2mr4i293qfgvsj.gif)', sm: 'url(https://res.cloudinary.com/dnlvoza12/image/upload/v1706687590/mpmlahkg9snt2pqevndl.gif)' } }}>
                <Box>
                    <img className="question-image-guess-pokemon" src={questionImage} alt="" />
                    <img className="pokemon-image-guess-pokemon" src={pokemonTitleImage} alt="" />
                </Box>
                <Box>
                    <img className={filter ? 'pokemon-filterON' : 'pokemon-filterOFF'} src={randomPokemon?.sprites.other.dream_world.front_default} alt="" width={200} />
                </Box>
                <Box component="form" sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, position: 'absolute', bottom: '1%' }}>
                    <TextField
                        id="filled-basic"
                        label="??????"
                        variant="filled"
                        value={pokemonName}
                        onChange={(e) => setPokemonName(e.target.value)}
                        sx={{ minWidth: 300, backgroundColor: 'white' }} />
                    <Button
                        type="submit"
                        variant="contained"
                        color="warning"
                        onClick={handleGuess}
                        endIcon={<Lottie animationData={buttonAnimation} style={{ width: 32 }} />}>
                        Enviar
                    </Button>
                </Box>
            </Container>
        </>
    )
}

export default GuessPokemon;