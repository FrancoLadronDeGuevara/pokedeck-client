import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Gameboy from "../../gameboy/Gameboy";
import { configurations } from "./game";
import "./FlapHaunter.css";
import { useDispatch, useSelector } from "react-redux";
import { getFlapHaunterCoins } from "../../../redux/actions/userActions";
import SoundToggle from "../SoundToggle";
import flapHaunterSong from "../../../assets/sounds/flap-haunter-song.mp3";
import Phaser from "phaser";

let game;
let handleScore;

const FlapHaunter = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [soundEnabled, setSoundEnabled] = useState(false);

  handleScore = (score) => {
    dispatch(getFlapHaunterCoins({ score }));
  };

  useEffect(()=>{
    const flapHaunterBackgroundSound = new Audio(flapHaunterSong);
    if (soundEnabled) {
      flapHaunterBackgroundSound.loop = true;
      flapHaunterBackgroundSound.play();
    } else {
      flapHaunterBackgroundSound.pause();
    }

    return () => {
      flapHaunterBackgroundSound.pause();
      flapHaunterBackgroundSound.src = "";
    };
  }, [soundEnabled])

  useEffect(() => {
    game = new Phaser.Game(configurations);

    return () => {
      game.destroy(true)
    }
  }, []);

  return (
    <>
      <Box
        className="coins-background"
        sx={{ position: "fixed", top: 77, left: "5%", zIndex: 999 }}
      >
        <SoundToggle onSoundToggle={setSoundEnabled} />
      </Box>
      <Gameboy score={`Mejor puntuación: ${user?.maxScoreFlapHaunter || "..."}`}>
        <Box className="container-flap-haunter">
          <div id="phaser-game"/>
        </Box>
      </Gameboy>
    </>
  );
};
export { game, handleScore };
export default FlapHaunter;
