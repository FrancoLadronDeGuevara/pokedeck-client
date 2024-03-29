import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import firstplace from "../../../assets/images/minigames/ranking/firstplace.webp";
import secondplace from "../../../assets/images/minigames/ranking/secondplace.webp";
import thirdplace from "../../../assets/images/minigames/ranking/thirdplace.webp";
import fourthplace from "../../../assets/images/minigames/ranking/fourthplace.webp";
import fifthplace from "../../../assets/images/minigames/ranking/fifthplace.webp";

const thStyle = {
  padding: { xs: 0, sm: 0 },
  fontWeight: "bolder",
  fontSize: { xs: 16, sm: 20 },
  color: "#227184",
};

const tableCellStyle = {
  fontSize: { xs: 11, sm: 16 },
  fontWeight: "bolder",
  color: "gray",
};

const PlayerList = ({ rankingTopUsers, gameRanking }) => {
  const navigate = useNavigate();

  function createData(place, username, rank) {
    return { place, username, rank };
  }

  const showRanking =
    gameRanking === "GuessPokemon"
      ? "maxScoreGuessPokemon"
      : "maxScoreFlapHaunter";

  const placeImages = [
    firstplace,
    secondplace,
    thirdplace,
    fourthplace,
    fifthplace,
  ];

  const rows = rankingTopUsers.map((user, index) =>
    createData(placeImages[index], user.username, user[showRanking])
  );

  const handleProfile = (username) => {
    navigate(`profile/${username}`);
  };

  return (
    <TableContainer
      component={Box}
      className="table-ranking"
      sx={{ p: "1rem 0" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={thStyle}>
              Puesto
            </TableCell>
            <TableCell align="center" sx={thStyle}>
              Usuario
            </TableCell>
            <TableCell align="center" sx={thStyle}>
              Puntuación
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              onClick={() => handleProfile(row.username)}
              key={row.place}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                cursor: "pointer",
                "&:hover": { backgroundColor: "#4fc4d636" },
              }}
            >
              <TableCell
                component="th"
                scope="row"
                align="center"
                sx={{ padding: 0 }}
              >
                <Box
                  component="img"
                  src={row.place}
                  sx={{ height: { xs: 30, sm: 40 }, width: { xs: 45, sm: 60 } }}
                />
              </TableCell>
              <TableCell align="center" sx={tableCellStyle}>
                {row.username}
              </TableCell>
              <TableCell align="center" sx={tableCellStyle}>
                {row.rank}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlayerList;
