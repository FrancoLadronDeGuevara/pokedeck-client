import { Box } from "@mui/system";
import { useState } from "react";
import DetailPokemon from "./DetailPokemon.jsx";

import "./PokemonCard.css";

const PokemonCard = ({
  pokedexNumber,
  name,
  types,
  imageCard,
  rarity,
  price,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => {
    setIsOpenModal(true);
  };

  return (
    <>
      <Box
        onClick={() => openModal()}
        className={
          rarity === "Legendaria" || rarity === "Epica"
            ? `container-pokemon-card card-${rarity} color-card-${types[0]}`
            : "container-pokemon-card"
        }
      >
        <img className={`image-pokemon `} src={imageCard} alt="" />
      </Box>
      {isOpenModal && (
        <DetailPokemon
          pokedexNumber={pokedexNumber}
          name={name}
          types={types}
          imageCard={imageCard}
          rarity={rarity}
          price={price}
          onClose={() => setIsOpenModal(false)}
        />
      )}
    </>
  );
};

export default PokemonCard;
