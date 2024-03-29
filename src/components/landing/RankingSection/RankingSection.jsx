import "./RankingSection.css";

import {  Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import clientAxios from "../../../utils/clientAxios";

import guessPokemonRanking from "../../../assets/images/minigames/ranking/guessminigameranking.webp";
import flaphaunterranking from "../../../assets/images/minigames/ranking/flaphaunterranking.webp";

import PlayerList from "./PlayersList";

const RankingSection = () => {
  const [rankingGuessPokemon, setRankingGuessPokemon] = useState([])
  const [rankingFlapHaunter, setRankingFlapHaunter] = useState([])

  const getRanking = async () => {
    await clientAxios('/minigames/get-ranking')
    .then(res => {
      setRankingGuessPokemon(res.data.topGuessPokemonScores);
      setRankingFlapHaunter(res.data.topFlapHaunterScores);
    })
  }

  useEffect(() => {
   getRanking()
  }, [])

  return (
    <>
    <Grid maxWidth="lg" container className="container-ranking-section" justifyContent='space-around'>
    <Box className="title-ranking">
    <Typography variant="h3" className="title-ranking-top">Top</Typography>
    <Typography variant="h3" className="title-ranking-bottom">Ranking</Typography>
    </Box>
      <Grid xs={12} md={5} item  display='flex' flexDirection='column' alignItems='center'  sx={{mt: {xs: 4, sm: 6, md: 0}}}>
        <img className="minigame-image" src={guessPokemonRanking} alt="Imagen minijuego quien es ese pokemon" />
        <PlayerList gameRanking="GuessPokemon" rankingTopUsers={rankingGuessPokemon}/>
      </Grid>
      <Grid xs={12} md={5} item display='flex' flexDirection='column' alignItems='center' sx={{mt: {xs: 4, sm: 3, md: 0}, mb: {xs: 2, sm: 2, md: 0}}}>
        <img className="minigame-image" src={flaphaunterranking} alt="Imagen minijuego flap haunter" />
        <PlayerList gameRanking="FlapHaunter" rankingTopUsers={rankingFlapHaunter}/>
      </Grid>
    </Grid>
    </>
  );
};

export default RankingSection;
