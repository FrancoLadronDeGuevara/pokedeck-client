import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { Button, Container, Divider, Typography } from "@mui/material";
import axios from "axios";
import { autoCloseAlert, customAlert } from "../../utils/alerts";
import { server } from "../../server";

import "./ChestStore.css";
import { useState } from "react";
import ModalOpenChest from "./ModalOpenChest";

const ChestStore = () => {
  const { chests } = useSelector((state) => state.chest);
  const { user } = useSelector((state) => state.user);

  const [openModal, setOpenModal] = useState(false);
  const [drawnCards, setDrawnCards] = useState([]);
  const [animation, setAnimation] = useState([]);
  const listChests = chests.slice(0, 4);
  const cardChests = chests.slice(4);

  const handleOpenChest = async (chestId, price) => {
    customAlert("", `¿Comprar por ₽${price}?`, "warning", async () => {
      await axios
        .post(
          `${server}/chests/openChest`,
          { userId: user._id, chestId },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res.data.cards);
          setAnimation((prevState) => [...prevState, chestId]);
          setTimeout(() => {
            setAnimation((prevState) =>
              prevState.filter((id) => id !== chestId)
            );
            setDrawnCards(res.data.cards);
            setOpenModal(true);
          }, 2000);
        })
        .catch((error) => {
          autoCloseAlert(error.response.data.message, "error", "red");
        });
    });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setDrawnCards([]);
  };

  return (
    <Container className="container-store">
      <Typography className="text" variant="h3" textAlign="center">
        Cofres
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          justifyContent: { xs: "center", md: "space-between" },
        }}
      >
        {listChests.map((chest, index) => (
          <Box
            className={`container-chest border-${chest.typeName}`}
            key={index}
          >
            <Typography
              className={`chest-title background-${chest.typeName}`}
              variant="h5"
            >
              Cofre {chest.typeName}
            </Typography>
            <img
              className={`chest-image ${
                animation.includes(chest._id) ? "buy-animation" : ""
              }`}
              src={chest.chestImage}
              alt=""
              style={{ height: 150 }}
            />
            <Typography className="chest-description">
              {chest.description}
            </Typography>
            <button
              className={`chest-button background-${chest.typeName}`}
              onClick={() => handleOpenChest(chest._id, chest.price)}
            >
              <Typography>Comprar por ₽{chest.price}</Typography>
            </button>
          </Box>
        ))}
      </Box>
      <Typography
        className="text"
        variant="h3"
        sx={{ textAlign: "center", mt: 2 }}
      >
        Cartas
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          justifyContent: { xs: "center", md: "space-between" },
          mb: { xs: 4, md: 2 },
        }}
      >
        {cardChests.map((card, cardIndex) => (
          <Box className={`container-chest border-card`} key={cardIndex}>
            <Typography className={`chest-title background-card`} variant="h5">
              {card.name}
            </Typography>
            <img
              className={`chest-image ${
                animation.includes(card._id) ? "buy-animation" : ""
              }`}
              src={card.chestImage}
              alt=""
              style={{ height: 150 }}
            />
            <Typography className="chest-description">
              {card.description}
            </Typography>
            <button
              className={`chest-button background-card`}
              onClick={() => handleOpenChest(card._id, card.price)}
            >
              <Typography>Comprar por ₽{card.price}</Typography>
            </button>
          </Box>
        ))}
      </Box>
      {openModal && (
        <ModalOpenChest
          openModal={openModal}
          cards={drawnCards}
          handleCloseModal={handleCloseModal}
        />
      )}
    </Container>
  );
};

export default ChestStore;
