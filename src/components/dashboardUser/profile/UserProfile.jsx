import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';
import { useSelector } from 'react-redux';
import formatDate from '../../../utils/formatDate';

const listStyle = {
    py: 2,
    width: '100%',
    maxWidth: 360,
};

const UserProfile = () => {
    const { user } = useSelector((state) => state.userState);

    return (
        <Container disableGutters sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mb: 1 }}>
            <Box sx={{ width: { xs: '100%', md: 300 }, p: 2, border: '1px solid black', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Avatar variant="rounded" src={user.avatar.url} sx={{ width: 200, height: 200 }} />
                <Typography align='center' variant='h5' sx={{ my: 1, fontWeight: 'bolder' }}>
                    {user.username}
                </Typography>
                <List sx={listStyle}>
                    <ListItem>
                        <ListItemText primary={user.email} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Juega desde: " />
                        <Typography sx={{ fontWeight: 'bolder' }}>
                            {formatDate(user.createdAt)}
                        </Typography>
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <ListItemText primary="Pokedeck: " />
                        <Typography sx={{ fontWeight: 'bolder' }}>
                            {user.userDeck.length} cartas
                        </Typography>
                    </ListItem>
                    <Divider />
                </List>

                <Typography variant='h4' sx={{ fontWeight: 'bolder' }}>
                    <MonetizationOnTwoToneIcon fontSize='medium' />
                    {user.coins}
                </Typography>
            </Box>
            <Box sx={{ width: '100%', p: 2, border: '1px solid black' }}>
                LLENAR DESPUES DE HACER LAS CARTAS
            </Box>
        </Container>
    )
}

export default UserProfile