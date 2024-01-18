
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllUsers } from '../../../redux/actions/userActions';
import Row from './StyledTable';


function createData(username, avatar, banned, deck, coins, email, createdAt, role, id) {
    return {
        username,
        avatar,
        banned,
        deck,
        coins,
        history: [
            {
                email,
                createdAt,
                role,
                id
            },
        ],
    };
}


const ItemAllUsers = () => {
    const { users } = useSelector((state) => state.userState)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsers())
    }, [])


    const rows = users.map(user => createData(user.username, user.avatar.url, user.disabled, user.userDeck, user.coins, user.email, user.createdAt, user.role, user._id))

    return (
        <TableContainer sx={{ overflowX: 'auto' }}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow >
                        <TableCell />
                        <TableCell sx={{fontWeight: 'bolder'}}>Usuario</TableCell>
                        <TableCell align="left" sx={{fontWeight: 'bolder'}}>Avatar</TableCell>
                        <TableCell align="center" sx={{fontWeight: 'bolder'}}>Baneado</TableCell>
                        <TableCell align="center" sx={{fontWeight: 'bolder'}}>Cartas</TableCell>
                        <TableCell align="center" sx={{fontWeight: 'bolder'}}>Monedas</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <Row key={index} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ItemAllUsers;
