import { Divider, Grid } from "@mui/material";
import "./RankingSection.css";
import guessPokemonRanking from "../../../assets/images/minigames/guessminigameranking.webp";
import PlayerList from "./PlayersList";

const RankingSection = () => {
  return (
    <Grid maxWidth="lg" container className="container-ranking-section" justifyContent='space-around'>
      <Grid xs={12} md={5} item className="container-left-ranking" display='flex' flexDirection='column' alignItems='center'  sx={{mt: {xs: 4, sm: 6, md: 0}}}>
        <img className="minigame-image" src={guessPokemonRanking} alt="" />
        <PlayerList />
      </Grid>
      <Grid xs={12} md={5} item className="container-right-ranking" display='flex' flexDirection='column' alignItems='center' sx={{mt: {xs: 4, sm: 3, md: 0}, mb: {xs: 2, sm: 2, md: 0}}}>
        <img className="minigame-image" src={guessPokemonRanking} alt="" />
        <PlayerList />
      </Grid>
    </Grid>
  );
};

export default RankingSection;
