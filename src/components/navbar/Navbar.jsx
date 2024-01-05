import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';

const pages = [{
    name: 'Mi Pokedeck',
    to: '/pokedeck',
},
{
    name: 'Tienda',
    to: '/store',
},
{
    name: 'Minijuegos',
    to: '/minigames',
}];

const settings = [{
    name: 'Perfil',
    to: '/profile',
},
{
    name: 'Configuración',
    to: '/userConfiguration',
},
{
    name: 'Salir',
    to: '/logout'
}];

const Navbar = () => {
    const location = useLocation();
    const [isAuth, setIsAuth] = useState(false)
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <>
            <AppBar position="sticky" sx={{ backgroundColor: 'rgba(60, 24, 221, 0.2)' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <CatchingPokemonIcon sx={{ display: { xs: 'none', sm: 'flex' }, mr: 1 }} color="error" />
                        <Typography
                            variant="h6"
                            noWrap
                            component={Link}
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', sm: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Pokedeck
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', sm: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <Link key={page} onClick={handleCloseNavMenu} to={page.to} style={{ textDecoration: 'none' }}>
                                        <MenuItem>
                                            <Typography textAlign="center" sx={{ color: 'black' }}>{page.name}</Typography>
                                        </MenuItem>
                                    </Link>
                                ))}
                            </Menu>
                        </Box>
                        <CatchingPokemonIcon sx={{ display: { xs: 'flex', sm: 'none' }, mr: 1 }} color="error" />
                        <Typography
                            variant="h5"
                            noWrap
                            component={Link}
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', sm: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Pokedeck
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
                            {pages.map((page) => (
                                <Link key={page} onClick={handleCloseNavMenu} to={page.to} style={{ textDecoration: 'none' }}>
                                    <MenuItem>
                                        <Typography textAlign="center" sx={{ color: 'white' }}>{page.name}</Typography>
                                    </MenuItem>
                                </Link>

                            ))}
                        </Box>

                        {isAuth ?
                            (<Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src="https://avatarfiles.alphacoders.com/755/75537.jpg" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <Link key={setting} onClick={handleCloseUserMenu} to={setting.to} style={{ textDecoration: 'none' }}>
                                            <MenuItem>
                                                <Typography textAlign="center" sx={{ color: 'black' }}>{setting.name}</Typography>
                                            </MenuItem>
                                        </Link>
                                    ))}
                                </Menu>
                            </Box>)
                            :
                            (<Box sx={{ flexGrow: 0 }}>
                                {location.pathname !== '/login' && location.pathname !== '/register' && (
                                    <Box>
                                        <Button variant="contained" size='small' sx={{ display: { xs: 'none', sm: 'block' } }}>
                                            <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>Ingresar</Link>
                                        </Button>
                                        <IconButton color="primary" variant="contained" size='small' sx={{ display: { xs: 'block', sm: 'none' } }}>
                                            <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}><LoginIcon/></Link>
                                        </IconButton>
                                    </Box>

                                )}
                                {location.pathname == '/login' && (
                                    <Button variant="contained" color='success' size='small'>
                                        <Link to="/register" style={{ textDecoration: 'none', color: 'inherit' }}>Registrarse</Link>
                                    </Button>
                                )}
                                {location.pathname == '/register' && (
                                    <Button variant="contained" size='small'>
                                        <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>Ingresar</Link>
                                    </Button>
                                )}
                            </Box>)
                        }
                    </Toolbar>
                </Container>
            </AppBar>

        </>
    )
}


export default Navbar;
