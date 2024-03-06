import "./GameSection.css";

import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import baseImage from "../../../assets/images/gameSection/base.png";
import guessMinigameImage from "../../../assets/images/minigames/guessminigame.webp";
import flapHaunterMinigameImage from "../../../assets/images/minigames/haunterminigame.webp";

const GameSection = () => {

  return (
    <>
      <Box className="title-game-section">
        <Typography sx={{ fontSize: { xs: 30, sm: 40, md: 60 } }}>
          <i>
            <span
              style={{
                textDecoration: "none",
                color: "rgb(255, 255, 0)",
                fontWeight: "bolder",
              }}
            >
              Juega
            </span>{" "}
            para ganar pokemonedas y abrir cofres!
          </i>
        </Typography>
      </Box>
      <Grid container maxWidth="lg" className="container-game-section">
        <Grid
          className="roulette-minigame"
          component={Link}
          to="/minigames/lucky-wheel"
          xs={12}
          item
        ></Grid>
        <Grid
          xs={12}
          sm={6}
          className="container-left-minigame"
          item
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box className="left-minigame">
            <Box component={Link} to="/minigames/guess-pokemon">
              <img src={guessMinigameImage} alt="" width="100%" height="100%" />
            </Box>
          </Box>
          <img className="base-image-left" src={baseImage} />
        </Grid>
        <Grid
          xs={12}
          sm={6}
          className="container-right-minigame"
          item
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box className="right-minigame">
            <Box component={Link} to="/minigames/flap-haunter">
              <img
                src={flapHaunterMinigameImage}
                alt=""
                width="100%"
                height="100%"
              />
            </Box>
          </Box>
          <img className="base-image-right" src={baseImage} />
        </Grid>
      </Grid>
    </>
  );
};

export default GameSection;
