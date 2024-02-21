import { Box, Button, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./WeeklyOffers.css";

const WeeklyOffers = () => {
  const navigate = useNavigate();
  const { chests } = useSelector((state) => state.chest);

  const cardChests = chests.slice(4);

  return (
    <Grid container maxWidth="lg" className="container-weekly-offers" sx={{p: {xs: 3, sm: 0}}}>
      <Grid className="weekly-offers" xs={12} item></Grid>
      {cardChests.map((card, cardIndex) => (
        <Grid
          key={cardIndex}
          xs={6}
          sm={3}
          item
          display="flex"
          justifyContent="center"
          alignItems="center"
          className="container-go-store"
        >
          <Box component="img" className="card-weekly-offers" src={card.chestImage} 
          sx={{width: {
            xs: 120,
            sm: 120,
            md: 200
          }, mt: {xs: 2, sm: 4}}}/>
          <button onClick={() => navigate('/store')} className="button-go-store">Ir a la tienda</button>
        </Grid>
      ))}
    </Grid>
  );
};

export default WeeklyOffers;
