import { styled } from "@mui/material/styles";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import baseImage from "../../../assets/images/gameSection/base.png";
import guessMinigameImage from "../../../assets/images/minigames/guessminigame.webp";
import flapHaunterMinigameImage from "../../../assets/images/minigames/haunterminigame.webp";
import "./GameSection.css";

const GameSection = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 280,
    height: 200,
    margin: 50,
    color: theme.palette.text.secondary,
  }));

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
