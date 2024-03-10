import "./WeeklyOffers.css";

import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import offertImage from "../../../assets/images/weeklyOffers/offert.webp";

const WeeklyOffers = () => {
  const { chests } = useSelector((state) => state.chest);

  const cardChests = chests.slice(4);

  return (
    <Grid
      container
      maxWidth="lg"
      className="container-weekly-offers"
      sx={{ p: { xs: 3, sm: 0 } }}
    >
      <Grid xs={12} className="title-weekly-offers" item>
        <Typography sx={{ fontSize: { xs: 30, sm: 40, md: 60 } }}>
          <i>
            Visita la
            <Link
              to="/store"
              style={{
                textDecoration: "none",
                color: "rgb(255, 255, 0)",
                fontWeight: "bolder",
              }}
            >
              {" "}
              Tienda
            </Link>{" "}
            para encontrar ofertas únicas!
          </i>
        </Typography>
      </Grid>
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
          <img src={offertImage} className="offert-image" />
          <Box
            component="img"
            className="card-weekly-offers"
            src={card.chestImage}
            sx={{
              width: {
                xs: 120,
                sm: 120,
                md: 200,
              },
              mt: { xs: 2, sm: 4 },
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default WeeklyOffers;
