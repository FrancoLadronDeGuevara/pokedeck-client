import { Box } from "@mui/material";
import { useRef, useState } from "react";
import Gameboy from "../../gameboy/Gameboy";
import "./LuckyWheel.css";
import wheelImage from "../../../assets/images/minigames/wheel.webp";
import SoundToggle from "../SoundToggle";
import spinSound from "../../../assets/sounds/spinning.mp3";

const spinWheelSound = new Audio(spinSound);

const LuckyWheel = () => {
  const [dataRuleta, setDataRuleta] = useState(0);
  const [animatedRuleta, setAnimatedRuleta] = useState(false);
  const [pointsData, setPointsData] = useState(0);
  const [ruletsData, setRuletsData] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const ruletaRef = useRef();

  const premiosList = [100, 200, 0, 500, 50, 20, 0, 300];

  const animarEvent = () => {
    const ruletaTemp = ruletsData;

    const gradosCirculo = 360;
    const premio = gradosCirculo / 8;

    const valorAleatorio = Math.floor(Math.random() * 8);
    const ruletaResult = premio * valorAleatorio;
    const valorPremio = gradosCirculo * 4 + ruletaResult;

    setRuletsData(valorAleatorio);
    setPointsData(premiosList[valorAleatorio]);

    setDataRuleta(ruletaTemp * premio);
    setAnimatedRuleta(true);

    setTimeout(() => {
      ruletaRef.current.classList.add("spin-animation");
      if (soundEnabled) spinWheelSound.play()
      setDataRuleta(valorPremio);
    }, 200);
  };

  const showRuletaResult = () => {
    ruletaRef.current.classList.remove("spin-animation");

    if (pointsData > 0) {
      console.log("Ganó", `¡Ha ganado ${pointsData} puntos!`);
      setAnimatedRuleta(false);
    } else {
      console.log("Perdiste", "¡Inténtelo nuevamente! :( ");
      setAnimatedRuleta(false);
    }
  };

  return (
    <>
      <Box  className='coins-background' sx={{ position: 'fixed', top: 77, left: '5%', zIndex: 999 }}>
        <SoundToggle onSoundToggle={setSoundEnabled} />
      </Box>
      <Gameboy>
        <Box className="container-lucky-wheel">
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
          <button
            className="spin-wheel-button"
            disabled={animatedRuleta}
            onClick={animarEvent}
          >
            GIRA LA RULETA
          </button>
        </Box>
      </Gameboy>
    </>
  );
};

export default LuckyWheel;
