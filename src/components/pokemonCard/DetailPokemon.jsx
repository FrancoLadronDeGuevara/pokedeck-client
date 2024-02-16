import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import {  Container, Typography } from "@mui/material";
import "./DetailPokemon.css";
import GlobalModal from "../globalModal/GlobalModal";

const DetailPokemon = ({
  pokedexNumber,
  name,
  types,
  imageCard,
  rarity,
  price,
  onClose,
}) => {
  const dispatch = useDispatch();

  const imageType = (type) => {
    const imagePath = "src/assets/images/types/";
    const imageFileName = type + ".png";
    const imageUrl = imagePath + imageFileName;
    return imageUrl;
  };

  const handleSellCard =  () => {

  }

  return (
    <>
      <GlobalModal onClose={onClose}>
        <Container maxWidth="sm" className="modal-card">
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-around",
              alignItems: { xs: "center", sm: "initial" },
            }}
          >
            <Box
              sx={{ cursor: "default" }}
              className={
                rarity === "Legendaria" || rarity === "Epica"
                  ? `container-pokemon-card card-${rarity} color-card-${types[0]}`
                  : "container-pokemon-card"
              }
            >
              <img src={imageCard} alt="" className="image-pokemon" />
            </Box>
            <Box className="pokemon-info" sx={{ my: { xs: 2, sm: 0 } }}>
              <Typography
                className="pokemon-number"
                sx={{ alignSelf: "self-end" }}
              >
                N° {pokedexNumber}
              </Typography>
              <Typography sx={{ alignSelf: "center" }} className="pokemon-name">
                {name}
              </Typography>
              <Box className="pokemon-types">
                {types.map((type, typeIndex) => (
                  <img
                    key={typeIndex}
                    src={imageType(type)}
                    alt={`Pokemon tipo ${type}`}
                  />
                ))}
              </Box>
              <Typography
                sx={{ alignSelf: "center" }}
                className="text pokemon-rarity"
              >
                Carta de tipo{" "}
                <span className={`pokemon-rarity pokemon-rarity-${rarity}`}>
                  {rarity}
                </span>
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              mt: { xs: 0, sm: 3 },
            }}
          >
            <button className="sell-button" onClick={handleSellCard}>Vender por ₽ {price}</button>
            <button className="close-button" onClick={onClose}>
              Cerrar
            </button>
          </Box>
        </Container>
      </GlobalModal>
    </>
  );
};

export default DetailPokemon;
