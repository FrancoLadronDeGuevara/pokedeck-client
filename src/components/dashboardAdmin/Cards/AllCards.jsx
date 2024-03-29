import {Container, Table, TableBody, TableCell,TableContainer, TableHead, TablePagination,  TableRow} from "@mui/material";
import Chip from "@mui/joy/Chip";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllCards } from "../../../redux/actions/cardActions";
import { getTypeColor } from "../../../utils/pokemonHelper";

import ModalEditCard from "./ModalEditCard";
import Loader from "../../loader/Loader";

const columns = [
  { id: "pokedexNumber", label: "N°", minWidth: 30 },
  { id: "name", label: "Nombre", minWidth: 80 },
  {
    id: "types",
    label: "Tipo",
    minWidth: 100,
    align: "left",
    format: (value) => (
      <>
        {value.map((type, index) => (
          <Chip
            size="sm"
            sx={{
              color: "white",
              backgroundColor: getTypeColor(type),
              marginRight: "4px",
              marginBottom: "4px",
              boxShadow: "0px 0px 2px black",
              textShadow: "0px 2px 1px black",
            }}
            key={index}
            label={type}
          >
            {type}
          </Chip>
        ))}
      </>
    ),
  },
  {
    id: "rarity",
    label: "Rareza",
    minWidth: 170,
    align: "right",
  },
  {
    id: "imageCard",
    label: "Miniatura",
    minWidth: 170,
    align: "right",
    format: (value) => (
      <img src={value} alt="Miniatura imagen card pokemon" style={{ width: 50, height: 64 }} />
    ),
  },
];

function createData(pokedexNumber, name, types, rarity, imageCard, idCard) {
  return { pokedexNumber, name, types, rarity, imageCard, idCard };
}

const AllCards = () => {
  const dispatch = useDispatch();
  const { cards, loading } = useSelector((state) => state.card);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const openEditModal = (card) => {
    setSelectedCard(card);
    setOpenModal(true);
  };

  useEffect(() => {
    dispatch(getAllCards());
  }, []);

  const rows = cards.map((card) =>
    createData(
      card.pokedexNumber,
      card.name,
      card.types,
      card.rarity,
      card.imageCard,
      card._id
    )
  );

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Container sx={{ width: "100%", overflow: "hidden", pt: 10 }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table" size="small">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      sx={{ fontWeight: "bolder" }}
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        key={index}
                        sx={{ cursor: "pointer" }}
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        onClick={() => openEditModal(row)}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format ? column.format(value) : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            labelRowsPerPage="Pokemons"
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          {openModal && selectedCard && (
            <ModalEditCard
              pokedex={selectedCard.pokedexNumber}
              pokemonName={selectedCard.name}
              pokemonTypes={selectedCard.types}
              pokemonRarity={selectedCard.rarity}
              cardImage={selectedCard.imageCard}
              idCard={selectedCard.idCard}
              onClose={() => setOpenModal(false)}
            />
          )}
        </Container>
      )}
    </>
  );
};

export default AllCards;
