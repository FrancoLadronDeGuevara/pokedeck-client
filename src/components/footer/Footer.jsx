import './Footer.css';

import Grid from '@mui/material/Unstable_Grid2';
import { Box, Container, Divider, Link, Typography } from '@mui/material';

import githubIcon from '../../assets/images/icons/github.webp';
import facebookIcon from '../../assets/images/icons/facebook.webp';
import linkedinIcon from '../../assets/images/icons/linkedin.webp';
import portfolioIcon from '../../assets/images/icons/portfolio.webp';

const Footer = () => {

    return (
        <Container className='footer-background' maxWidth={false} sx={{ pt: 1 }}>
            <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid xs={12} sm={6} textAlign='center' >
                    <Typography className='footer-text'>Creado por Franco Guevara© - 2024</Typography>
                <Divider orientation='horizontal' flexItem sx={{display: {xs: 'block', sm: 'none'}}}/>
                </Grid>
                <Grid xs={12} sm={6} sx={{mt:1}}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Link href="https://github.com/FrancoLadronDeGuevara" underline="none" target="_blank" rel="noreferrer">
                            <img src={githubIcon} alt="Imagen icono github" className='footer-icon' />
                        </Link>
                        <Link href="https://web.facebook.com/FrancoDeGuevara/" underline="none" target="_blank" rel="noreferrer">
                            <img src={facebookIcon} alt="Imagen icono facebook" className='footer-icon' />
                        </Link>
                        <Link href="https://franco-guevara-portfolio.vercel.app/" underline="none" target="_blank" rel="noreferrer">
                            <img src={portfolioIcon} alt="Imagen icono portfolio" className='footer-icon' />
                        </Link>
                        <Link href="https://www.linkedin.com/in/franco-guevara/" underline="none" target="_blank" rel="noreferrer">
                            <img src={linkedinIcon} alt="Imagen icono linkedin" className='footer-icon' />
                        </Link>
                    </Box>
                </Grid>

            </Grid>
        </Container>
    )
}

export default Footer;
