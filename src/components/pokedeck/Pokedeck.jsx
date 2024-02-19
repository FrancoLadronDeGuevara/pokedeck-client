import {
  Box,
  Container,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PokemonCard from "../pokemonCard/PokemonCard";

import PokemonFilter from "./PokemonFilter";

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
      <PokemonFilter
        pokemon={pokemon}
        setPokemon={setPokemon}
        filter={filter}
        setFilter={setFilter}
        rarity={rarity}
        setRarity={setRarity}
        type={type}
        setType={setType}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {message && (
        <Box
          className="user-cards"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
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
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 2,
              m: 1,
            }}
          >
            {filteredCards
              .slice((page - 1) * 12, page * 12)
              .map((card, cardIndex) => (
                <Box
                  key={cardIndex}
                  sx={{
                    mb: 1,
                  }}
                >
                  <PokemonCard
                    imageCard={card.imageCard}
                    name={card.name}
                    pokedexNumber={card.pokedexNumber}
                    types={card.types}
                    rarity={card.rarity}
                    price={card.price}
                  />
                </Box>
              ))}
          </Box>
          <Stack spacing={2} sx={{ my: 2 }}>
            <Typography>Página: {page}</Typography>
            <Pagination
              count={Math.ceil(filteredCards.length / 12)}
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
