import { useState } from 'react';
import PropTypes from 'prop-types';
import {Box, Collapse, IconButton, Table, TableBody, TableHead, styled, Avatar, TableCell, TableRow} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

import {formatDate} from '../../../utils/formatTime';

import ModalEditUser from './ModalEditUser';


export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Row = ({ row }) => {
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const openEditModal = () => {
        setOpenModal(true);
    }

    return (
        <>
            <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.username}
                </TableCell>
                <TableCell align="right"><Avatar variant="rounded" alt={row.avatar} src={row.avatar} /></TableCell>
                <TableCell align="center">{row.banned ? 'Si' : 'No'}</TableCell>
                <TableCell align="center">{row.deck && row.deck.length}</TableCell>
                <TableCell align="center">{row.coins}</TableCell>
            </StyledTableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Table size="small" aria-label="details">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Email</StyledTableCell>
                                        <StyledTableCell>Creado</StyledTableCell>
                                        <StyledTableCell>Rol</StyledTableCell>
                                        <StyledTableCell>Editar</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow, index) => (
                                        <StyledTableRow key={index}>
                                            <TableCell>{historyRow.email}</TableCell>
                                            <TableCell>{formatDate(historyRow.createdAt)}</TableCell>
                                            <TableCell>{historyRow.role == 'admin' ? 'Admin' : 'Usuario'}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => openEditModal()}>
                                                    <EditTwoToneIcon />
                                                </IconButton>
                                                {openModal && (
                                                    <ModalEditUser
                                                        userId={historyRow.id}
                                                        userBanned={row.banned}
                                                        userRole={historyRow.role}
                                                        userCoins={row.coins}
                                                        onClose={() => setOpenModal(false)}
                                                    />
                                                )}
                                            </TableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                                
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        username: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        banned: PropTypes.bool.isRequired,
        deck: PropTypes.array.isRequired,
        coins: PropTypes.number.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                createdAt: PropTypes.string.isRequired,
                email: PropTypes.string.isRequired,
                role: PropTypes.string.isRequired,
            }),
        ).isRequired,
    }).isRequired,
};

export default Row;