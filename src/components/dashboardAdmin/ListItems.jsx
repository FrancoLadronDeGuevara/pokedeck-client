import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import PeopleIcon from '@mui/icons-material/People';
import CatchingPokemonTwoToneIcon from '@mui/icons-material/CatchingPokemonTwoTone';
import AllInboxTwoToneIcon from '@mui/icons-material/AllInboxTwoTone';
import SportsEsportsTwoToneIcon from '@mui/icons-material/SportsEsportsTwoTone';
import { Link } from 'react-router-dom';

export const mainListItems = (
    <>
        <Link to='/dashboard/users' style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Editar usuarios" />
            </ListItemButton>
        </Link>

        <Link to='/dashboard/cards' style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton>
                <ListItemIcon>
                    <CatchingPokemonTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary="Crear carta" />
            </ListItemButton>
        </Link>

        <Link to='/dashboard/chests' style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton>
                <ListItemIcon>
                    <AllInboxTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary="Crear cofre" />
            </ListItemButton>
        </Link>

        <Link to='/dashboard/games' style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton>
                <ListItemIcon>
                    <SportsEsportsTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary="Editar juegos" />
            </ListItemButton>
        </Link>
    </>
);

export const secondaryListItems = (
    <>
        <ListSubheader component="div" inset>
            Ver todo
        </ListSubheader>

        <Link to='/dashboard/allCards' style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton>
                <ListItemIcon>
                    <CatchingPokemonTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary="Cartas" />
            </ListItemButton>
        </Link>

        <Link to='/dashboard/allChests' style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton>
                <ListItemIcon>
                    <AllInboxTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary="Cofres" />
            </ListItemButton>
        </Link>

        <Link to='/dashboard/allUsers' style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Usuarios" />
            </ListItemButton>
        </Link>
    </>
);