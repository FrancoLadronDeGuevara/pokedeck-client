import "./GuessPokemon.css"

import { Box, Divider, IconButton, InputBase, Paper} from "@mui/material";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { useDispatch, useSelector } from "react-redux";

import { getCoins, resetScore } from "../../../redux/actions/userActions";
import { autoCloseAlertWithImage } from "../../../utils/alerts";
import { getRandomPokemon } from "./game";


import pokemonTitleImage from "../../../assets/images/minigames/guessPokemon/pokemon.webp"
import questionImage from "../../../assets/images/minigames/guessPokemon/who.webp"
import guesspokemonsound from "../../../assets/sounds/quienesesepokemonsonido.mp3";
import successpokemonsound from "../../../assets/sounds/success.mp3";
import errorpokemonsound from "../../../assets/sounds/error.mp3";
import pikachuError from "../../../assets/images/alerts/errorPikachu.gif";
import odishSuccess from "../../../assets/images/alerts/successOdish.gif";
import buttonAnimation from "../../../assets/animations/ButtonAnimation/pokeballbutton.json"

import Gameboy from "../../gameboy/Gameboy";
import SoundToggle from "../SoundToggle";

const whosthatpokemonSound = new Audio(guesspokemonsound);
const successSound = new Audio(successpokemonsound);
const errorSound = new Audio(errorpokemonsound)

const GuessPokemon = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user)
    const [pokemonName, setPokemonName] = useState('')
    const [randomPokemon, setRandomPokemon] = useState(null);
    const [filter, setFilter] = useState(true);
    const [soundEnabled, setSoundEnabled] = useState(false);
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
                        dispatch(resetScore())
                    } else {
                        if (soundEnabled) successSound.play()
                        autoCloseAlertWithImage('', odishSuccess, 250, 150)
                        setFilter(false)
                        setInputPokemon(true)
                    }
                    setPokemonName('');
                    setTimeout(() => {
                        setRandomPokemon(null)
                        startGame();
                    }, 2000)
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Box className='coins-background' sx={{ position: 'fixed', top: 77, left: '5%', zIndex: 999 }}>
                <SoundToggle onSoundToggle={setSoundEnabled} />
            </Box>
            <Gameboy score={`Puntuación: ${user?.scoreGuessPokemon}`}>
                <Box className="container-guess-pokemon" sx={{
                    backgroundImage:
                    {
                        xs: 'url(https://res.cloudinary.com/dnlvoza12/image/upload/v1706688671/fxvlwd2mr4i293qfgvsj.gif)',
                        sm: 'url(https://res.cloudinary.com/dnlvoza12/image/upload/v1706687590/mpmlahkg9snt2pqevndl.gif)'
                    }
                }}>
                    <Box
                        sx={{
                            display:{xs: 'none', sm: 'block'},
                            position: 'absolute',
                            left: { sm: '55%', md: '60%' },
                            top: '40%',
                        }}>
                        <img className="question-image" src={questionImage} alt="" />
                    </Box>
                    <Box
                        sx={{
                            position: 'absolute',
                            left: { xs: '20%', sm: '35%', md: '50%' },
                            right: { xs: '20%', sm: '35%', md: '50%' },
                            top: '1%',
                        }}>
                        <img className="pokemon-image-guess-pokemon" src={pokemonTitleImage} alt="" />
                    </Box>
                    <Box sx={{
                        position: "absolute",
                        left: { xs: '40%', sm: '15%', md: '19%' },
                        top: { xs: '40%', sm: '30%' },
                    }}>
                        <img draggable="false" className={filter ? 'pokemon-filterON' : 'pokemon-filterOFF'} src={randomPokemon?.sprites.other.dream_world.front_default} alt="" />
                    </Box>
                    <Paper component="form" sx={{
                        display: "flex",
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: '2%',
                        height: 40,
                        minWidth: { xs: 150, sm: 350 },
                        left: { xs: '20%', sm: '20%', md: '30%' },
                        right: { xs: '20%', sm: '40%' }
                    }}>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Pokemón"
                            disabled={inputPokemon}
                            value={pokemonName}
                            onChange={(e) => setPokemonName(e.target.value)}
                            inputProps={{ 'aria-label': 'Ingresa el pokemón' }}
                        />
                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        <IconButton
                            color="primary"
                            type="submit"
                            disabled={!pokemonName}
                            onClick={handleGuess}
                            aria-label="Enviar">
                            <Lottie animationData={buttonAnimation} style={{ width: 32 }} />
                        </IconButton>
                    </Paper>
                </Box>
            </Gameboy>
        </>
    )
}

export default GuessPokemon;