import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { rarityList, typeList } from "../../utils/pokemonHelper";

const PokemonFilter = ({
  pokemon,
  setPokemon,
  filter,
  setFilter,
  rarity,
  setRarity,
  type,
  setType,
  sortBy,
  setSortBy,
}) => {
  return (
    <Box
      sx={{
        width: { xs: '100%', sm: '50%', md: '50%'},
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        justifyContent: "space-evenly",
        p: 1,
      }}
    >
      <Box>
        <Typography variant="h6" className="text">
          Buscar por...
        </Typography>
        <Paper
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
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
      </Box>
      
      <Box>
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
      </Box>

      
      <Box>
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
    </Box>
  );
};

export default PokemonFilter;
