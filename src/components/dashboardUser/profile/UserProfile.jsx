import "./UserProfile.css";

import {
  Box,
  Container,
  ListItemText,
  Avatar,
  List,
  Typography,
  ListItem,
  Divider,
  Grid,
} from "@mui/material";
import CurrencyRubleOutlinedIcon from "@mui/icons-material/CurrencyRubleOutlined";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import clientAxios from "../../../utils/clientAxios";
import { autoCloseAlertWithImage } from "../../../utils/alerts";
import { formatDate } from "../../../utils/formatTime";

import scoreGuessPokemon from "../../../assets/images/backgrounds/scoreGuessPokemon.webp";
import scoreFlapHaunter from "../../../assets/images/backgrounds/scoreFlapHaunter.webp";
import errorPikachu from "../../../assets/images/alerts/errorPikachu.gif";

import Loader from "../../loader/Loader";

const listStyle = {
  py: 2,
  width: "100%",
  maxWidth: 360,
};

const UserProfile = () => {
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user);
  const { username } = useParams();
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      await clientAxios
        .get(`/users/profile/${username}`)
        .then((res) => setUserProfile(res.data))
        .catch((error) => {
          autoCloseAlertWithImage(
            error.response.data.message,
            errorPikachu,
            200,
            200
          );
          navigate("/");
        });
    };

    getUserData();
  }, [username]);

  const lastThreeCards = userProfile?.userDeck?.slice(
    Math.max(userProfile.userDeck.length - 6, 0)
  );

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Container
          maxWidth={false}
          disableGutters
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            height: "fit-content",
            mb: 1,
            px: 2,
          }}
        >
          <Box
            className="user-info"
            sx={{
              width: { xs: "100%", md: 300 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Avatar
              variant="rounded"
              src={userProfile?.avatar?.url}
              sx={{ width: 200, height: 200 }}
            />
            <Typography
              className="text user-username-background"
              align="center"
              variant="h5"
              sx={{ my: 1, fontWeight: "bolder" }}
            >
              {userProfile?.username}
            </Typography>
            <List sx={listStyle}>
              <ListItem>
                <ListItemText primary={userProfile?.email} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Juega desde: " />
                <Typography sx={{ fontWeight: "bolder" }}>
                  {formatDate(userProfile?.createdAt)}
                </Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Pokedeck: " />
                <Typography sx={{ fontWeight: "bolder" }}>
                  {userProfile?.userDeck?.length} cartas
                </Typography>
              </ListItem>
              <Divider />
            </List>

            <Typography
              className="text user-coins-background"
              variant="h4"
              sx={{ fontWeight: "bolder", mb: { xs: 2, sm: 0 } }}
            >
              <CurrencyRubleOutlinedIcon fontSize="medium" />
              {userProfile?.coins}
            </Typography>
          </Box>
          <Box
            className="user-cards"
            sx={{ width: "100%", p: 1, pb: 2, px: { md: 3 } }}
          >
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" className="text" textAlign="center">
                Últimas cartas obtenidas
              </Typography>
              <Divider sx={{ my: 1 }} />
              <ThemeProvider
                theme={createTheme({
                  breakpoints: {
                    values: {
                      laptop: 1024,
                      tablet: 530,
                      mobile: 0,
                    },
                  },
                })}
              >
                <Grid container spacing={{ mobile: 1, tablet: 2, laptop: 3 }}>
                  {lastThreeCards && lastThreeCards.length > 0 ? (
                    lastThreeCards?.map((card, index) => (
                      <Grid
                        item
                        key={index}
                        mobile={6}
                        tablet={4}
                        laptop={2}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Box
                          sx={{ cursor: "default" }}
                          className={
                            card.rarity === "Legendaria" ||
                            card.rarity === "Epica"
                              ? `container-pokemon-card container-last-user-cards card-${card.rarity} color-card-${card.types[0]}`
                              : "container-pokemon-card container-last-user-cards"
                          }
                        >
                          <img
                            className="image-pokemon last-user-cards"
                            src={card.imageCard}
                            alt={`Carta ${index + 1}`}
                          />
                        </Box>
                      </Grid>
                    ))
                  ) : (
                    <Grid mobile={12} sx={{ my: 2 }}>
                      <Typography
                        variant="h2"
                        className="text"
                        textAlign="center"
                      >
                        Sin cartas
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </ThemeProvider>
            </Box>
            <Box>
              <Typography variant="h4" className="text" textAlign="center">
                Mejores puntajes
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Grid
                container
                sx={{
                  p: 1,
                }}
              >
                <Grid
                  xs={12}
                  sm={12}
                  md={6}
                  item
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: { xs: 2, md: 0 },
                    position: "relative",
                  }}
                >
                  <img className="game-image" src={scoreGuessPokemon} alt="" />
                  <Typography textAlign="center" className="score-text">
                    Score: {userProfile?.maxScoreGuessPokemon} pts.
                  </Typography>
                </Grid>
                <Grid
                  xs={12}
                  sm={12}
                  md={6}
                  item
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: { xs: 2, md: 0 },
                    position: "relative",
                  }}
                >
                  <img className="game-image" src={scoreFlapHaunter} alt="" />
                  <Typography textAlign="center" className="score-text">
                    Score: {userProfile?.maxScoreFlapHaunter} pts.
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
};

export default UserProfile;
