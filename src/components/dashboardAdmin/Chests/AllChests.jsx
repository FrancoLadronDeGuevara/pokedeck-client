import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ModalEditChest from './ModalEditChest';
import Loader from '../../loader/Loader';
import { Typography } from '@mui/material';

const columns = [
    { id: 'name', label: 'Nombre', minWidth: 120 },
    {
        id: 'price',
        label: 'Precio',
        minWidth: 80,
        align: 'center',
    },
    {
        id: 'typeName',
        label: 'Tipo de Cofre',
        minWidth: 110,
        align: 'left',
    },
    {
        id: 'quantityOfCards',
        label: 'Cartas que da',
        minWidth: 120,
        align: 'center',
    },
    {
        id: 'rarityOfCards',
        label: 'Rareza de Cartas',
        minWidth: 130,
        align: 'left',
    },
    {
        id: 'chestImage',
        label: 'Miniatura',
        minWidth: 80,
        align: 'right',
        format: (value) => (
            <img src={value} alt="Miniatura" style={{ width: 50, height: 64 }} />
        ),
    },
];

function createData(name, price, description, typeName, quantityOfCards, rarityOfCards, chestImage, idChest) {
    return { name, price, description, typeName, quantityOfCards, rarityOfCards, chestImage, idChest };
}

const AllChests = () => {
    const { chests, loading } = useSelector((state) => state.chest)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openModal, setOpenModal] = useState(false);
    const [selectedChest, setSelectedChest] = useState(null);


    const openEditModal = (chest) => {
        setSelectedChest(chest);
        setOpenModal(true);
    }


    const rows = chests.map(chest => createData(chest.name, chest.price, chest.description, chest.typeName, chest.quantityOfCards, chest.rarityOfCards, chest.chestImage, chest._id))

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(+e.target.value);
        setPage(0);
    };

    return (
        <>
            {loading ?
                <Loader />
                :
                <Container sx={{  overflow: 'hidden', pt: 10 }}>
                    <TableContainer>
                        <Table stickyHeader aria-label="sticky table" size='small'>
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            sx={{ fontWeight: 'bolder' }}
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
                                {rows.length == 0 ?
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant='h4'>
                                                Todavía no hay cofres
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    :
                                    rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                        return (
                                            <TableRow
                                                key={index}
                                                sx={{ cursor: 'pointer' }}
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                onClick={() => openEditModal(row)}
                                            >
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format
                                                                ? column.format(value)
                                                                : value == 0 ? 'Gratis' : value ? value : 'Sin rareza de cartas'}
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
                        labelRowsPerPage='Cofres'
                        rowsPerPageOptions={[5, 10, 20]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    {openModal && selectedChest && (
                        <ModalEditChest
                            chestName={selectedChest.name}
                            chestPrice={selectedChest.price}
                            chestDescription={selectedChest.description}
                            chestType={selectedChest.typeName}
                            quantityOfCards={selectedChest.quantityOfCards}
                            chestImage={selectedChest.chestImage}
                            idChest={selectedChest.idChest}
                            onClose={() => setOpenModal(false)}
                        />
                    )}
                </Container>
            }
        </>
    );
}

export default AllChests;