import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import "./DetailPokemon.css";
import GlobalModal from "../globalModal/GlobalModal";
import { useDispatch } from "react-redux";
import { autoCloseAlert, customAlert } from "../../utils/alerts";
import { getUserDeck, sellCard } from "../../redux/actions/userActions";

const DetailPokemon = ({
  pokedexNumber,
  name,
  types,
  imageCard,
  rarity,
  price,
  onClose,
  hideButton
}) => {
  const dispatch = useDispatch();

  const handleSellCard = () => {
    const data = {pokedexNumber, price}
    customAlert(
      "Vender Carta",
      `¿Seguro que deseas vender esta carta por ₽${price}?`,
      "warning",
      () => {
        dispatch(sellCard(data)).then(() => {
          autoCloseAlert('Carta Vendida', 'success', 'green');
          dispatch(getUserDeck())
        })
      }
    );
  };

  return (
    <>
      <GlobalModal onClose={onClose}>
        
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
                  <Box key={typeIndex} className={`type-card-${type}`} sx={{width: 100, height: 20, my: 1}}/>
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
            <button className={`sell-button ${hideButton ? 'hide-button' : 'show-button'}`} onClick={handleSellCard}>
              Vender por ₽ {price}
            </button>
            <button className="close-button" onClick={onClose}>
              Cerrar
            </button>
          </Box>

      </GlobalModal>
    </>
  );
};

export default DetailPokemon;
