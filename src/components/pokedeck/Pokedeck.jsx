import {
  Box,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { rarityList, typeList } from "../../utils/pokemonHelper";

const Pokedeck = () => {
  const { userDeck } = useSelector((state) => state.user);
  const [pokemon, setPokemon] = useState("");
  const [filter, setFilter] = useState("obtained");
  const [rarity, setRarity] = useState("Todas las rarezas");
  const [type, setType] = useState("Todos los tipos");
  const [sortBy, setSortBy] = useState("lastObtained");
  const [filteredCards, setFilteredCards] = useState(userDeck);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    filterCards();
  }, [userDeck, pokemon, filter, rarity, type, sortBy, page]);

  const filterCards = () => {
    let filtered = [...userDeck];

    if (filter === "obtained") {
      filtered = userDeck;
    } else if (filter === "repeated") {
      const cardNames = new Set();
      filtered = filtered.filter((card) => {
        if (cardNames.has(card.name)) {
          return true;
        } else {
          cardNames.add(card.name);
          return false;
        }
      });
    }

    if (isNaN(pokemon)) {
      filtered = filtered.filter((card) =>
        card.name.toLowerCase().includes(pokemon.toLowerCase())
      );
    } else {
      filtered = filtered.filter((card) =>
        card.pokedexNumber.toString().includes(pokemon)
      );
    }

    if (rarity === "Todas las rarezas") {
      filtered = filtered.filter((card) => card);
    } else {
      filtered = filtered.filter((card) => card.rarity === rarity);
    }

    if (type === "Todos los tipos") {
      filtered = filtered.filter((card) => card);
    } else {
      filtered = filtered.filter((card) => {
        const [type1, type2] = card.types;
        return (
          type1 === type.toUpperCase() ||
          (type2 && type2 === type.toUpperCase())
        );
      });
    }

    if (sortBy === "lastObtained") {
      filtered = filtered.reverse();
    } else if (sortBy === "pokemonName") {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "pokedexNumber") {
      filtered = filtered.sort((a, b) => a.pokedexNumber - b.pokedexNumber);
    }

    if (userDeck.length === 0) {
      setMessage("Todavía no tienes cartas...");
    } else if (filtered.length === 0) {
      setMessage("No se encontraron coincidencias...");
    } else if (filter === "repeated" && filtered.length === userDeck.length) {
      setMessage("No tienes cartas repetidas...");
    } else {
      setMessage("");
    }

    setFilteredCards(filtered);
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        mb: 1,
        px: 2,
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: 300 },
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          padding: 1,
        }}
      >
        <Typography variant="h6" className="text">
          Buscar por...
        </Typography>
        <Paper
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            height: 40,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Pokemón, n° de pokedex"
            value={pokemon}
            onChange={(e) => setPokemon(e.target.value)}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton disabled>
            <SearchIcon />
          </IconButton>
        </Paper>
        <Divider flexItem sx={{ my: 2 }} />
        <Typography variant="h6" className="text">
          Filtrar por...
        </Typography>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <FormControlLabel
              value="obtained"
              control={<Radio />}
              label="Obtenidas"
            />
            <FormControlLabel
              value="repeated"
              control={<Radio />}
              label="Repetidas"
            />
          </RadioGroup>
        </FormControl>
        <FormControl fullWidth size="small" sx={{ my: 1 }}>
          <InputLabel>Rareza</InputLabel>
          <Select
            value={rarity}
            label="Rareza"
            onChange={(e) => setRarity(e.target.value)}
          >
            {rarityList.map((rarity, index) => (
              <MenuItem key={index} value={rarity}>
                {rarity}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth size="small" sx={{ my: 1 }}>
          <InputLabel>Tipo</InputLabel>
          <Select
            MenuProps={{
              PaperProps: {
                sx: {
                  width: 200,
                  maxHeight: 300,
                },
              },
            }}
            value={type}
            label="Tipo"
            onChange={(e) => setType(e.target.value)}
          >
            {typeList.map((type, index) => (
              <MenuItem key={index} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Divider flexItem sx={{ my: 2 }} />
        <Typography variant="h6" className="text">
          Ordenar por...
        </Typography>
        <FormControl>
          <RadioGroup
            aria-labelledby="sortedBy"
            name="sortedBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <FormControlLabel
              value="pokedexNumber"
              control={<Radio />}
              label="N° de pokedex"
            />
            <FormControlLabel
              value="pokemonName"
              control={<Radio />}
              label="Nombre"
            />
            <FormControlLabel
              value="lastObtained"
              control={<Radio />}
              label="Últimas obtenidas"
            />
          </RadioGroup>
        </FormControl>
      </Box>

      {message && (
        <Box
          className="user-cards"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            p: 1,
            pb: 2,
            px: { md: 3 },
          }}
        >
          <Typography variant="h4" textAlign="center" className="text">
            <i>{message}</i>
          </Typography>
        </Box>
      )}
      {filteredCards.length > 0 && (
        <Box
          className="user-cards"
          sx={{
            width: "100%",
            p: 1,
            pb: 2,
            px: { md: 3 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems:'center'
          }}
        >
          <Box>
            {filteredCards
              .slice((page - 1) * 10, page * 10)
              .map((card, index) => (
                <img
                  key={index}
                  src={card.imageCard}
                  style={{ width: 150, height: 200 }}
                />
              ))}
          </Box>
          <Stack spacing={2}>
            <Typography>Página: {page}</Typography>
            <Pagination
              count={Math.ceil(filteredCards.length / 10)}
              page={page}
              onChange={handleChange}
            />
          </Stack>
        </Box>
      )}
    </Container>
  );
};

export default Pokedeck;
