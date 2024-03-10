import "./ModalOpenChest.css";

import { Box, Container, Modal, Backdrop, Fade } from "@mui/material";

import PokemonCard from "../pokemonCard/PokemonCard";

const ModalOpenChest = ({ openModal, cards, handleCloseModal }) => {
  return (
    <Modal
      sx={{ zIndex: "99999", mx: 1 }}
      open={openModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={true}>
        <Container maxWidth="sm" className="modal-open-chest">
          <Box className="chest-rewards animation-chest-rewards">
            {cards.map((card, cardIndex) => (
              <PokemonCard
                key={cardIndex}
                pokedexNumber={card.pokedexNumber}
                name={card.name}
                types={card.types}
                imageCard={card.imageCard}
                rarity={card.rarity}
                price={card.price}
                hideButton={true}
              />
            ))}
          </Box>
          <button className="modal-open-chest-button" onClick={handleCloseModal}>
            Aceptar
          </button>
        </Container>
      </Fade>
    </Modal>
  );
};

export default ModalOpenChest;
