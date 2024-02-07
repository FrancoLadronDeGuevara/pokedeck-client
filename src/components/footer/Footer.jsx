import './Footer.css';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Container, Divider, Link, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { brown } from '@mui/material/colors';
import logo from '../../assets/images/logo.png'
import githubIcon from '../../assets/github.png';
import facebookIcon from '../../assets/facebook.png';
import linkedinIcon from '../../assets/linkedin.png';
import portfolioIcon from '../../assets/portfolio.png';

const Footer = () => {

    return (
        <Container className='footer-background' maxWidth={false}>
            <Grid container spacing={2}>
                <Grid xs={12} sm={6}>
                    <Box sx={{ display: 'flex', justifyContent: { xs: 'center' } }}>
                        <img src={logo} alt="" width={150} />
                    </Box>
                </Grid>
                <Grid xs={12} sm={6} p={0}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: {xs: 2, sm: 5} }}>
                        <Link href="https://github.com/FrancoLadronDeGuevara" underline="none" target="_blank" rel="noreferrer">
                            <img src={githubIcon} className='footer-icon' />
                        </Link>
                        <Link href="https://web.facebook.com/FrancoDeGuevara/" underline="none" target="_blank" rel="noreferrer">
                            <img src={facebookIcon} className='footer-icon' />
                        </Link>
                        <Link href="https://franco-guevara-portfolio.vercel.app/" underline="none" target="_blank" rel="noreferrer">
                            <img src={portfolioIcon} className='footer-icon' />
                        </Link>
                        <Link href="https://www.linkedin.com/in/franco-guevara/" underline="none" target="_blank" rel="noreferrer">
                            <img src={linkedinIcon} className='footer-icon' />
                        </Link>
                    </Box>
                </Grid>
                <Grid xs={12} sm={12} textAlign='center' >
                    <Divider orientation="horizontal" flexItem sx={{ mb: 1 }} />
                    <Typography variant='h7' sx={{ color: 'darkslategrey', fontWeight: 'bolder' }}>Creado por Franco Guevara - 2023</Typography>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Footer;
