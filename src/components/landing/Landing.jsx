import "./Landing.css";

import { Box, Container } from "@mui/material";

import dividerImg from "../../assets/images/backgrounds/divider.webp";

import GameSection from "./GameSection/GameSection";
import RankingSection from "./RankingSection/RankingSection";
import WeeklyOffers from "./WeeklyOffers/WeeklyOffers";
import SupportSection from "./SupportSection/SupportSection";
import ModalCookies from "../modalCookies/ModalCookies";
import { useEffect, useState } from "react";

const Landing = () => {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const hasSeenNotification = localStorage.getItem(
      "hasSeenCookieNotification"
    );
    if (!hasSeenNotification) {
      setShowNotification(true);
    }
  }, []);

  const handleCloseNotification = () => {
    setShowNotification(false);
    localStorage.setItem("hasSeenCookieNotification", "true");
  };

  return (
    <>
      <Container maxWidth={false} disableGutters>
        <Box className="container-top-image">
          <Box className="left-top-image"></Box>
          <Box className="right-top-image"></Box>
          <Box className="logo-top-image"></Box>
        </Box>

        <GameSection />
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <img src={dividerImg} alt="Divider image" className="divider-image" />
        </Box>
        <RankingSection />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mt: 10,
          }}
        >
          <img src={dividerImg} alt="Divider image" className="divider-image" />
        </Box>
        <WeeklyOffers />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mt: 10,
          }}
        >
          <img src={dividerImg} alt="Divider image" className="divider-image" />
        </Box>
        <SupportSection />
        {showNotification && <ModalCookies onClose={handleCloseNotification} />}
      </Container>
    </>
  );
};

export default Landing;
