import { useDispatch, useSelector } from "react-redux";
import { Container, Divider, Typography, Box } from "@mui/material";
import { autoCloseAlert, customAlert } from "../../utils/alerts";
import offertImage from "../../assets/images/offert.webp";
import beforeImage from "../../assets/images/before.webp";

import "./ChestStore.css";
import { useState } from "react";
import ModalOpenChest from "./ModalOpenChest";
import { getUser } from "../../redux/actions/userActions";
import clientAxios from "../../utils/clientAxios";
import Loader from "../loader/Loader";

const ChestStore = () => {
  const dispatch = useDispatch();
  const { chests } = useSelector((state) => state.chest);
  const { user, loading } = useSelector((state) => state.user);

  const [openModal, setOpenModal] = useState(false);
  const [drawnCards, setDrawnCards] = useState([]);
  const [animation, setAnimation] = useState([]);

  const listChests = chests.slice(0, 4);
  const cardChests = chests.slice(4);

  const handleOpenChest = async (chestId, price) => {
    customAlert(`¿Comprar por ₽${price}?`, async () => {
      await clientAxios
        .post(`/chests/openChest`, { userId: user._id, chestId })
        .then((res) => {
          setAnimation((prevState) => [...prevState, chestId]);
          setTimeout(() => {
            setAnimation((prevState) =>
              prevState.filter((id) => id !== chestId)
            );
            setDrawnCards(res.data.cards);
            setOpenModal(true);
          }, 2000);
          dispatch(getUser());
        })
        .catch((error) => {
          autoCloseAlert(error.message, "error");
        });
    });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setDrawnCards([]);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
            {listChests.map((chest, chestIndex) => (
              <Box className="container-chest" key={chestIndex}>
                <img
                  className={`chest-image ${
                    animation.includes(chest._id) ? "buy-animation" : ""
                  }`}
                  src={chest.chestImage}
                  alt=""
                />
                <button
                  className={`chest-button`}
                  onClick={() => handleOpenChest(chest._id, chest.price)}
                >
                  <Typography variant="h6">
                    Comprar por <span className="price">₽ {chest.price}</span>
                  </Typography>
                </button>
              </Box>
            ))}
          </Box>
          <Typography
            className="text"
            variant="h3"
            sx={{ textAlign: "center", mt: 2 }}
          >
            Cartas Especiales
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
                <img
                  src={offertImage}
                  className={`offert  ${
                    animation.includes(card._id) ? "offert-animation" : ""
                  }`}
                />
                <img
                  className={`chest-image ${
                    animation.includes(card._id) ? "buy-animation" : ""
                  }`}
                  src={card.chestImage}
                  alt=""
                />
                <img
                  src={beforeImage}
                  className={`before-price  ${
                    animation.includes(card._id) ? "offert-animation" : ""
                  }`}
                />
                <button
                  className="chest-button"
                  onClick={() => handleOpenChest(card._id, card.price)}
                >
                  <Typography variant="h6">
                    Comprar por <span className="price"> ₽ {card.price}</span>
                  </Typography>
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
      )}
    </>
  );
};

export default ChestStore;
