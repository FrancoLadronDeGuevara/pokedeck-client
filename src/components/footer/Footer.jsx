import Grid from '@mui/material/Unstable_Grid2';
import { Box, Link, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { brown } from '@mui/material/colors';

const Footer = () => {

    return (
        <>
            <Grid container spacing={2} sx={{ p: 2 }}>
                <Grid xs={12} sm={6}>
                    <Box sx={{ display: 'flex', justifyContent: { xs: 'center' } }}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/800px-Pokebola-pokeball-png-0.png" alt="Pokedeck Logo" width={64} />
                        <Typography variant="h3" noWrap sx={{ marginLeft: 1 }}>
                            Pokedeck
                        </Typography>
                    </Box>
                </Grid>
                <Grid xs={12} sm={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Link href="https://github.com/FrancoLadronDeGuevara" underline="none" target="_blank" rel="noreferrer">
                            <GitHubIcon color="action" fontSize="large" sx={{ mx: 1 }} />
                        </Link>
                        <Link href="https://web.facebook.com/FrancoDeGuevara/" underline="none" target="_blank" rel="noreferrer">
                            <FacebookIcon color="primary" fontSize="large" sx={{ mx: 1 }} />
                        </Link>
                        <Link href="https://franco-guevara-portfolio.vercel.app/" underline="none" target="_blank" rel="noreferrer">
                            <BusinessCenterIcon sx={{ color: brown[500], mx: 1 }} fontSize="large" />
                        </Link>
                        <Link href="https://www.linkedin.com/in/franco-guevara/" underline="none" target="_blank" rel="noreferrer">
                            <LinkedInIcon  color="primary" sx={{ mx: 1 }} fontSize="large" />
                        </Link>
                    </Box>
                </Grid>
                <Grid xs={12} sm={12} textAlign='center'>
                    <Box>Franco Guevara - 2023. Todos los derechos reservados.</Box>
                </Grid>
            </Grid>
        </>
    )
}

export default Footer;
