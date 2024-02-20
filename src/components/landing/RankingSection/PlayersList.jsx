import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Avatar, Box } from "@mui/material";
import example from "../../../assets/images/alerts/errorPikachu.gif";
import firstplace from "../../../assets/images/minigames/firstplace.webp";
import "./PlayerList.css";

function createData(place, username, rank) {
  return { place, username, rank };
}

const rows = [
  createData(firstplace, "PokeAdministrador", 67),
  createData(firstplace, "SoyPikachu", 49),
  createData(firstplace, "CuentaNuevecita", 37),
  createData(firstplace, "Aquipomngootracosa", 24),
  createData(firstplace, "xsxsxsxsxsxsxsxs", 24),
];

const PlayerList = () => {

    const handleProfile = (username) => {
        console.log(username)
    }

  return (
    <TableContainer component={Box} className="table-ranking">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              align="center"
              sx={{ padding: { xs: 0, sm: 0 }, fontWeight: "bolder" }}
            >
              Puesto
            </TableCell>
            <TableCell
              align="center"
              sx={{ padding: { xs: 0, sm: 0 }, fontWeight: "bolder" }}
            >
              Usuario
            </TableCell>
            <TableCell
              align="center"
              sx={{ padding: { xs: 0, sm: 0 }, fontWeight: "bolder" }}
            >
              Puntuación
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              onClick={() => handleProfile(row.username)}
              key={row.place}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
              <TableCell align="center" sx={{ fontSize: { xs: 11, sm: 16 } }}>
                {row.username}
              </TableCell>
              <TableCell align="center" sx={{ fontSize: { xs: 11, sm: 16 } }}>
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
