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
import { Grid } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const listStyle = {
    py: 2,
    width: '100%',
    maxWidth: 360,
};


const UserProfile = () => {
    const { user, loading, userDeck } = useSelector((state) => state.user);

    const lastThreeCards = userDeck?.slice(Math.max(userDeck.length - 6, 0));

    return (
        <>


            {loading ?
                <Loader />
                :
                <Container maxWidth={false} disableGutters sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mb: 1, px: 2 }}>
                    <Box className='user-info' sx={{ width: { xs: '100%', md: 300 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Avatar variant="rounded" src={user?.avatar?.url} sx={{ width: 200, height: 200 }} />
                        <Typography className='text user-username-background' align='center' variant='h5' sx={{ my: 1, fontWeight: 'bolder' }}>
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

                        <Typography className='text user-coins-background' variant='h4' sx={{ fontWeight: 'bolder' }}>
                            <CurrencyRubleOutlinedIcon fontSize='medium' />
                            {user?.coins}
                        </Typography>
                    </Box>
                    <Box className='user-cards' sx={{ width: '100%', p:1, pb: 2, px: {md: 3}}}>
                        <Typography variant='h4' className='text' textAlign='center'>
                            Últimas cartas obtenidas
                        </Typography>
                        <Divider sx={{ my: 1 }} />
                        <ThemeProvider
                            theme={createTheme({
                                breakpoints: {
                                    values: {
                                        laptop: 1024,
                                        tablet: 530,
                                        mobile: 0,
                                    },
                                },
                            })}
                        >
                            <Grid container spacing={{ mobile: 1, tablet: 2, laptop: 3 }}>
                                {lastThreeCards?.map((card, index) => (
                                    <Grid item key={index} mobile={6} tablet={4} laptop={2} display="flex" justifyContent="center" alignItems="center">
                                        <img className={`user-last-cards color-card-hover-${card.types[0]}`} src={card.imageCard} alt={`Carta ${index + 1}`} width={120} />
                                    </Grid>
                                ))}
                            </Grid>
                        </ThemeProvider>
                    </Box>
                </Container>
            }
        </>

    )
}

export default UserProfile