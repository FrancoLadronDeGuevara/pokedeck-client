import { Box, Container, Grid, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Landing = () => {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 280,
        height: 200,
        margin: 50,
        color: theme.palette.text.secondary,
    }));

    return (
        <>
            <Container maxWidth='xl'>
                <Box textAlign="center">
                    <Typography variant="h5" sx={{my: 10}}>
                        Pokedeck es un proyecto pensado para aquellos que les gusta coleccionar!
                        Es muy simple: juega, ganá puntos, abre cofres y colecciona!
                    </Typography>
                </Box>
                <Grid container >
                    <Grid xs={12} sm={6} lg={3} display='flex' justifyContent='center'>
                        <Item>Cup Game</Item>
                    </Grid>
                    <Grid xs={12} sm={6} lg={3} display='flex' justifyContent='center'>
                        <Item >Memoria</Item>
                    </Grid>
                    <Grid xs={12} sm={6} lg={3} display='flex' justifyContent='center'>
                        <Item>FlappyBird</Item>
                    </Grid>
                    <Grid xs={12} sm={6} lg={3} display='flex' justifyContent='center'>
                        <Item>Quizz</Item>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Landing;