import { Box, Button, Container, Paper, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import buttonAnimation from "../../../assets/ButtonAnimation/pokeballbutton.json"
import { getRandomPokemon } from "./game";
import pokemonTitleImage from "../../../assets/images/pokemon.png"
import questionImage from "../../../assets/images/who.png"
import "./GuessPokemon.css"
import { useDispatch, useSelector } from "react-redux";
import { getCoins, resetScore } from "../../../redux/actions/userActions";
import { autoCloseAlertWithImage } from "../../../utils/alerts";
import SoundGuessPokemon from "./SoundGuessPokemon";
import guesspokemonsound from "../../../assets/sounds/quienesesepokemonsonido.mp3";
import successpokemonsound from "../../../assets/sounds/success.mp3";
import errorpokemonsound from "../../../assets/sounds/error.mp3";
import pikachuError from "../../../assets/images/pikachuerror.gif";
import odishSuccess from "../../../assets/images/odish.gif";

const whosthatpokemonSound = new Audio(guesspokemonsound);
const successSound = new Audio(successpokemonsound);
const errorSound = new Audio(errorpokemonsound)

const GuessPokemon = () => {
    const dispatch = useDispatch();
    const [pokemonName, setPokemonName] = useState('')
    const [randomPokemon, setRandomPokemon] = useState(null);
    const [filter, setFilter] = useState(true);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [inputPokemon, setInputPokemon] = useState(false);

    useEffect(() => {
        dispatch(resetScore());
        startGame();
    }, []);

    const startGame = () => {
        getRandomPokemon()
            .then(pokemon => {
                if (pokemon) {
                    setRandomPokemon(pokemon);
                    setTimeout(() => setInputPokemon(false), 2000)
                    setFilter(true);
                    if (soundEnabled) whosthatpokemonSound.play()
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

        try {
            dispatch(getCoins(data))
                .then((res) => {
                    if (res.error) {
                        if (soundEnabled) errorSound.play()
                        autoCloseAlertWithImage('', pikachuError, 150, 150)
                        setInputPokemon(true)
                    } else {
                        if (soundEnabled) successSound.play()
                        autoCloseAlertWithImage('', odishSuccess, 250, 150)
                        setFilter(false)
                        setInputPokemon(true)
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
            <Box className='coins-background' sx={{ position: 'fixed', top: 94, left: '5%', zIndex: 999 }}>
                <SoundGuessPokemon onSoundToggle={setSoundEnabled} />
            </Box>
            <Container maxWidth='md' className="gameboy">
                    <Box className="container-guess-pokemon" sx={{
                        backgroundImage:
                        {
                            xs: 'url(https://res.cloudinary.com/dnlvoza12/image/upload/v1706688671/fxvlwd2mr4i293qfgvsj.gif)',
                            sm: 'url(https://res.cloudinary.com/dnlvoza12/image/upload/v1706687590/mpmlahkg9snt2pqevndl.gif)'
                        }
                    }}>

                        <Box sx={{
                            position: 'absolute',
                            left: { xs: '44%', sm: '70%', md: '77%' },
                            top: '20%'
                        }}>
                            <img className="question-image-guess-pokemon" src={questionImage} alt="" />
                        </Box>
                        <Box
                            sx={{
                                position: 'absolute',
                                left: { xs: '25%', sm: '60%', md: '70%' },
                                bottom: '28%'
                            }}>
                            <img className="pokemon-image-guess-pokemon" src={pokemonTitleImage} alt="" />
                        </Box>
                        <Box sx={{
                            position: "absolute",
                            left: { xs: '40%', sm: '15%', md: '19%' },
                            top: { xs: '40%', sm: '30%' },
                        }}>
                            <img className={filter ? 'pokemon-filterON' : 'pokemon-filterOFF'} src={randomPokemon?.sprites.other.dream_world.front_default} alt="" />
                        </Box>
                        <Box component="form" sx={{
                            display: "flex",
                            position: 'absolute',
                            bottom: '14%',
                            left: { xs: '1%', sm: '20%', md: '30%' },
                            right: { xs: '1%', sm: '20%', md: '30%' }
                        }}>
                            <TextField
                                fullWidth
                                label="Pokémon:"
                                variant="outlined"
                                disabled={inputPokemon}
                                value={pokemonName}
                                onChange={(e) => setPokemonName(e.target.value)}
                                sx={{ minWidth: 100, backgroundColor: 'white' }} />
                            <Button
                                type="submit"
                                size="small"
                                variant="contained"
                                sx={{ backgroundColor: '#3C18DD' }}
                                disabled={!pokemonName}
                                onClick={handleGuess}
                                endIcon={<Lottie animationData={buttonAnimation} style={{ width: 32 }} />}>
                                Enviar
                            </Button>
                        </Box>
                    </Box>
            </Container>
        </>
    )
}

export default GuessPokemon;