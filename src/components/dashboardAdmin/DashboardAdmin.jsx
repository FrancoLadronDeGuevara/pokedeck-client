import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CatchingPokemonTwoToneIcon from '@mui/icons-material/CatchingPokemonTwoTone';
import AllInboxTwoToneIcon from '@mui/icons-material/AllInboxTwoTone';
import SportsEsportsTwoToneIcon from '@mui/icons-material/SportsEsportsTwoTone';
import PeopleIcon from '@mui/icons-material/People';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';

const DashboardAdmin = () => {
    const [value, setValue] = useState(0);
    const isSmallScreen = useMediaQuery('(max-width: 600px)');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (

        <Tabs 
        value={value} 
        onChange={handleChange}
        aria-label="icon label tabs example" 
        variant={isSmallScreen ? 'scrollable' : 'fullWidth'}
        scrollButtons={isSmallScreen ? 'auto' : false} 
        allowScrollButtonsMobile
        sx={{position: 'sticky', top: 56, zIndex: 999, backgroundColor: 'cyan'}}
        >

            <Tab icon={<PeopleIcon />} label="Todos los usuarios" component={Link} to='allUsers' />

            <Tab icon={<AllInboxTwoToneIcon />} label="Todos los cofres" component={Link} to='allChests' />

            <Tab icon={<CatchingPokemonTwoToneIcon />} label="Todas las cartas" component={Link} to='allCards' />

            <Tab icon={<CatchingPokemonTwoToneIcon />} label="Crear Carta" component={Link} to='cards' />

            <Tab icon={<AllInboxTwoToneIcon />} label="Crear Cofre" component={Link} to='chests' />

            <Tab icon={<SportsEsportsTwoToneIcon />} label="Editar juegos" component={Link} to='editGames' />

        </Tabs>

    );
}

export default DashboardAdmin;
