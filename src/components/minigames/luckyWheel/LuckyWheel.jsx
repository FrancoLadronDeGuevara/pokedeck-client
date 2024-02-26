import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Gameboy from "../../gameboy/Gameboy";
import "./LuckyWheel.css";
import wheelImage from "../../../assets/images/minigames/wheel.webp";
import pointerWheelImage from "../../../assets/images/minigames/pointerWheel.webp";
import dancingPokemonImage from "../../../assets/images/minigames/dancingPokemon.gif";
import SoundToggle from "../SoundToggle";
import spinSound from "../../../assets/sounds/spinning.mp3";
import luckyWheelBackground from "../../../assets/sounds/lucky-wheel-background.mp3";
import { useDispatch, useSelector } from "react-redux";
import { getUser, spinWheel } from "../../../redux/actions/userActions";
import { autoCloseAlert } from "../../../utils/alerts";
import { formatLastSpinTime } from "../../../utils/formatTime";

const spinWheelSound = new Audio(spinSound);

const LuckyWheel = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.user)
  const [dataRuleta, setDataRuleta] = useState(0);
  const [userPrize, setUserPrize] = useState(0);
  const [animatedRuleta, setAnimatedRuleta] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [timeForNewSpin, setTimeForNewSpin] = useState("en ...");
  const ruletaRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeForNewSpin = formatLastSpinTime(user?.lastSpinTime);
      setTimeForNewSpin(newTimeForNewSpin || "Calculando...");
    }, 1000);

    return () => clearInterval(interval);
  }, [user?.lastSpinTime]);

  useEffect(() => {
    const luckyWheel = new Audio(luckyWheelBackground);
    if (soundEnabled) {
      luckyWheel.loop = true;
      luckyWheel.play();
    } else {
      luckyWheel.pause();
    }

    return () => {
      luckyWheel.pause();
      luckyWheel.src = "";
    };
  }, [soundEnabled]);

  const animarEvent = async () => {
    await dispatch(spinWheel()).then((res) => {
      dispatch(getUser())
      if (res.error) return autoCloseAlert(res.error.message, "error", "red");
      setAnimatedRuleta(true);
      setUserPrize(res.payload.pointsData)
      const wheelResult = 45 * res.payload.randomValue;
      const prizeValue = 360 * 4 + wheelResult;

      setTimeout(() => {
        ruletaRef.current.classList.add("spin-animation");
        if (soundEnabled) spinWheelSound.play();
        setDataRuleta(prizeValue);
        
      }, 200);
    });
  };

  const showRuletaResult = () => {
    ruletaRef.current.classList.remove("spin-animation");
    setTimeForNewSpin(formatLastSpinTime(user?.lastSpinTime))
    if (userPrize > 0) {
      autoCloseAlert(`Felicidades! Ganaste ₽${userPrize} monedas`, 'success', 'green')
      setAnimatedRuleta(false);
    } else {
      autoCloseAlert(`Perdiste! Vuelve a intentarlo luego!`, 'error', 'red')
      setAnimatedRuleta(false);
    }
  };

  return (
    <>
      <Box
        className="coins-background"
        sx={{ position: "fixed", top: 77, left: "5%", zIndex: 999 }}
      >
        <SoundToggle onSoundToggle={setSoundEnabled} />
      </Box>
      <Gameboy score={`Próximo giro: ${timeForNewSpin}`}>
        <Box className="container-lucky-wheel">
          <img src={pointerWheelImage} className="pointer-wheel" />
          <img
            src={wheelImage}
            className="lucky-wheel"
            style={{
              transform: `rotate(${dataRuleta}deg)`,
              WebkitTransform: `rotate(${dataRuleta}deg)`,
            }}
            alt="Ruleta"
            onTransitionEnd={showRuletaResult}
            ref={ruletaRef}
          />
          <img src={dancingPokemonImage} className="dancing-pokemon" />
          <button
            className="spin-wheel-button"
            disabled={animatedRuleta}
            onClick={animarEvent}
          >
            GIRAR LA RULETA
          </button>
        </Box>
      </Gameboy>
    </>
  );
};

export default LuckyWheel;
