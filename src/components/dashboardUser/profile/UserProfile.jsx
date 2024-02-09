import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useSelector } from 'react-redux';
import formatDate from '../../../utils/formatDate';
import Loader from '../../loader/Loader';
import './UserProfile.css';
import CurrencyRubleOutlinedIcon from '@mui/icons-material/CurrencyRubleOutlined';

const listStyle = {
    py: 2,
    width: '100%',
    maxWidth: 360,
};

const UserProfile = () => {
    const { user, loading, userDeck } = useSelector((state) => state.user);

    const lastThreeCards = userDeck?.slice(Math.max(userDeck.length - 5, 0));

    return (
        <>
            {loading ?
                <Loader />
                :
                <Container disableGutters sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mb: 1}}>
                    <Box className='user-info' sx={{ width: { xs: '100%', md: 300 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Avatar variant="rounded" src={user?.avatar?.url} sx={{ width: 200, height: 200 }} />
                        <Typography align='center' variant='h5' sx={{ my: 1, fontWeight: 'bolder' }}>
                            {user?.username}
                        </Typography>
                        <List sx={listStyle}>
                            <ListItem>
                                <ListItemText primary={user?.email} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Juega desde: " />
                                <Typography sx={{ fontWeight: 'bolder' }}>
                                    {formatDate(user?.createdAt)}
                                </Typography>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Pokedeck: " />
                                <Typography sx={{ fontWeight: 'bolder' }}>
                                    {user?.userDeck?.length} cartas
                                </Typography>
                            </ListItem>
                            <Divider />
                        </List>

                        <Typography variant='h4' sx={{ fontWeight: 'bolder' }}>
                            <CurrencyRubleOutlinedIcon fontSize='medium' />
                            {user?.coins}
                        </Typography>
                    </Box>
                    <Box className='user-cards' sx={{ width: '100%'}}>
                        {lastThreeCards?.map((card, index) => <img key={index} src={card.imageCard} width={100}/>)}
                    </Box>
                </Container>
            }
        </>

    )
}

export default UserProfile