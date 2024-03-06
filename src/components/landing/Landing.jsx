import "./Landing.css";

import { Box, Container } from "@mui/material";

import GameSection from "./GameSection/GameSection";
import RankingSection from "./RankingSection/RankingSection";
import WeeklyOffers from "./WeeklyOffers/WeeklyOffers";
import dividerImg from "../../assets/images/backgrounds/divider.png";
import SupportSection from "./SupportSection/SupportSection";

const Landing = () => {

  return (
    <>
      <Container maxWidth={false} disableGutters>
        <Box className="container-top-image">
          <Box className="left-top-image"></Box>
          <Box className="right-top-image"></Box>
          <Box className="logo-top-image"></Box>
        </Box>
        
        <GameSection/>
        <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
          <img src={dividerImg} alt="Divider image" className="divider-image"/>
        </Box>
        <RankingSection/>
        <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', mt: 10}}>
          <img src={dividerImg} alt="Divider image" className="divider-image"/>
        </Box>
        <WeeklyOffers/>
        <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', mt: 10}}>
          <img src={dividerImg} alt="Divider image" className="divider-image"/>
        </Box>
        <SupportSection/>
      </Container>
    </>
  );
};

export default Landing;
