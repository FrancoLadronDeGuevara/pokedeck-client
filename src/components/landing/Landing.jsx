import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./Landing.css";
import GameSection from "./GameSection/GameSection";
import RankingSection from "./RankingSection/RankingSection";

const Landing = () => {
 
  return (
    <>
      <Container maxWidth={false} disableGutters>
        <Box className="container-top-image">
          <Box className="left-top-image"></Box>
          <Box className="right-top-image"></Box>
          <Box className="logo-top-image"></Box>
        </Box>
        <Box className="info-proyect">
          <Typography variant="h3" sx={{fontSize: {xs: 30, sm: 35, md: 40}}}>
            <i>
              Pokedeck es un proyecto pensado para aquellos que les gusta
              coleccionar!<br/> Es muy simple :
              <Link
                to="/register"
                style={{
                  textDecoration: "none",
                  color: "rgb(255, 255, 0)",
                  fontWeight: "bolder",
                }}
              >
                {" "}
                crea tu cuenta
              </Link>
              , juega, gana puntos, abre cofres y colecciona!
            </i>
          </Typography>
        </Box>
        <GameSection/>
        <RankingSection/>
      </Container>
    </>
  );
};

export default Landing;
