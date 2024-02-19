import { styled } from "@mui/material/styles";
import { Box, Container, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import baseImage from "../../../assets/images/gameSection/base.png";
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
    <Grid container maxWidth='lg' className="container-game-section">
      <Grid xs={12} sm={6} className="container-left-minigame" item sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Box className="left-minigame">
          <Link to="/guesspokemon">Quien es ese pokemon</Link>
        </Box>
        <img className="base-image-left" src={baseImage} />
      </Grid>
      <Grid xs={12} sm={6} className="container-right-minigame" item sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Box className="right-minigame">
          <Link to="/guesspokemon">Quien es ese pokemon</Link>
        </Box>
        <img className="base-image-right" src={baseImage} />
      </Grid>
    </Grid>
  );
};

export default GameSection;
