import { Box } from "@mui/material";
import { useEffect } from "react";
import Gameboy from "../../gameboy/Gameboy";
import { configurations } from "./game";
import "./FlapHaunter.css";
import { useDispatch, useSelector } from "react-redux";
import { getFlapHaunterCoins } from "../../../redux/actions/userActions";

let game;
let handleScore

const FlapHaunter = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user)

  handleScore = (score) => {
    dispatch(getFlapHaunterCoins({score}))
    .then(res => console.log(res))
  };


  useEffect(() => {
    game = new Phaser.Game(configurations);

    callBack: handleScore
  }, []);


  return (
    <Gameboy score={`Mejor puntuación: ${user?.maxScoreFlapHaunter}`}>
      <Box className="container-flap-haunter">
        <div id="phaser-game" />
      </Box>
    </Gameboy>
  );
};
export { game, handleScore };
export default FlapHaunter;
