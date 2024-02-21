import {  Grid } from "@mui/material";
import "./RankingSection.css";
import guessPokemonRanking from "../../../assets/images/minigames/guessminigameranking.webp";
import PlayerList from "./PlayersList";
import clientAxios from "../../../utils/clientAxios";
import { useEffect, useState } from "react";

const RankingSection = () => {
  const [rankingGuessPokemon, setRankingGuessPokemon] = useState([])
  const [rankingFlapHunter, setRankingFlapHunter] = useState([])

  const getRanking = async () => {
    await clientAxios('/minigames/get-ranking')
    .then(res => {
      setRankingGuessPokemon(res.data.topGuessPokemonScores);
      setRankingFlapHunter(res.data.topFlapHunterScores);
    })
  }

  useEffect(() => {
   getRanking()
  }, [])

  return (
    <Grid maxWidth="lg" container className="container-ranking-section" justifyContent='space-around'>
      <Grid xs={12} md={5} item  display='flex' flexDirection='column' alignItems='center'  sx={{mt: {xs: 4, sm: 6, md: 0}}}>
        <img className="minigame-image" src={guessPokemonRanking} alt="" />
        <PlayerList gameRanking="GuessPokemon" rankingTopUsers={rankingGuessPokemon}/>
      </Grid>
      <Grid xs={12} md={5} item display='flex' flexDirection='column' alignItems='center' sx={{mt: {xs: 4, sm: 3, md: 0}, mb: {xs: 2, sm: 2, md: 0}}}>
        <img className="minigame-image" src={guessPokemonRanking} alt="" />
        <PlayerList gameRanking="FlapHunter" rankingTopUsers={rankingFlapHunter}/>
      </Grid>
    </Grid>
  );
};

export default RankingSection;
