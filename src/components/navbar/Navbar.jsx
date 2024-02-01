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
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import { useSelector } from 'react-redux';
import { customAlert } from '../../utils/alerts';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_URL_BASE_API


const pages = [{
    name: 'Mi Pokedeck',
    to: '/pokedeck',
},
{
    name: 'Tienda',
    to: '/store',
}];

const settings = [
    {
        name: 'Perfil',
        to: '/userProfile',
    },
    {
        name: 'Configuración',
        to: '/userConfiguration',
    },
    {
        name: 'Salir',
        to: () => { },
    }];

const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { user, isAuthenticated, loading } = useSelector((state) => state.user);


    const handleOpenNavMenu = (event) => {
        if (anchorElNav && anchorElNav.contains(event.target)) {
            handleCloseNavMenu();
        } else {
            setAnchorElNav(event.currentTarget);
        }
    };

    const handleOpenUserMenu = (event) => {
        if (anchorElUser && anchorElUser.contains(event.target)) {
            handleCloseUserMenu();
        } else {
            setAnchorElUser(event.currentTarget);
        }
    };

    const handleLogoutUser = () => {
        customAlert('¿Cerrar sesión?', '', 'question', async () => {
            try {
                await axios.get(`${apiUrl}/users/logout-user`, { withCredentials: true })
                setTimeout(() => {
                    navigate('/')
                    window.location.reload()
                }, 1000)
            } catch (error) {
                console.log(error)
            }
        })
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <>
            <AppBar position="sticky" sx={{ backgroundColor: 'rgb(60, 24, 221)', zIndex: 9999 }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <CatchingPokemonIcon sx={{ display: { xs: 'none', sm: 'flex' }, mr: 1 }} color="error" />
                        <Typography
                            variant="h6"
                            noWrap
                            component={NavLink}
                            to="/"
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
                                {pages.map((page, index) => (
                                    <NavLink key={index} onClick={handleCloseNavMenu} to={page.to} style={{ textDecoration: 'none' }}>
                                        <MenuItem>
                                            <Typography textAlign="center" sx={{ color: 'black' }}>{page.name}</Typography>
                                        </MenuItem>
                                    </NavLink>
                                ))}
                            </Menu>
                        </Box>
                        <CatchingPokemonIcon sx={{ display: { xs: 'flex', sm: 'none' }, mr: 1 }} color="error" />
                        <Typography
                            variant="h5"
                            noWrap
                            component={NavLink}
                            to="/"
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
                            {pages.map((page, index) => (
                                <NavLink key={index} onClick={handleCloseNavMenu} to={page.to} style={{ textDecoration: 'none' }}>
                                    <MenuItem>
                                        <Typography textAlign="center" sx={{ color: 'white' }}>{page.name}</Typography>
                                    </MenuItem>
                                </NavLink>

                            ))}
                        </Box>

                        {isAuthenticated &&
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar variant="rounded" alt="Image user avatar" src={user?.avatar?.url} />
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
                                    {user?.role == 'admin' &&
                                        <NavLink to='/admin' onClick={handleCloseUserMenu} style={{ textDecoration: 'none' }}>
                                            <MenuItem>
                                                <Typography textAlign="center" sx={{ color: 'black' }}>Dashboard</Typography>
                                            </MenuItem>
                                        </NavLink>
                                    }
                                    {settings.map((setting, index) => (
                                        <NavLink key={index} onClick={setting.name == 'Salir' ? handleLogoutUser : handleCloseUserMenu} to={setting.to} style={{ textDecoration: 'none' }}>
                                            <MenuItem>
                                                <Typography textAlign="center" sx={{ color: 'black' }}>{setting.name}</Typography>
                                            </MenuItem>
                                        </NavLink>
                                    ))}

                                </Menu>
                            </Box>
                        }
                        {
                            !loading && !isAuthenticated && <Box sx={{ flexGrow: 0 }}>
                                {location.pathname !== '/login' && location.pathname !== '/register' && (
                                    <Box>
                                        <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <Button variant="contained" size='small' sx={{ display: { xs: 'none', sm: 'block' } }}>
                                                Ingresar
                                            </Button>
                                        </Link>
                                        <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <IconButton color="primary" variant="contained" size='small' sx={{ display: { xs: 'block', sm: 'none' } }}>
                                                <LoginIcon />
                                            </IconButton>
                                        </Link>
                                    </Box>

                                )}
                                {location.pathname == '/login' && (
                                    <Link to="/register" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <Button variant="contained" color='success' size='small'>
                                            Registrarse
                                        </Button>
                                    </Link>
                                )}
                                {location.pathname == '/register' && (
                                    <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <Button variant="contained" size='small'>
                                            Ingresar
                                        </Button>
                                    </Link>
                                )}
                            </Box>
                        }


                    </Toolbar>
                </Container>
            </AppBar>
            <Box sx={{ position: 'fixed', top: 70, right: 30, zIndex: 999 }}>
                <Typography variant='h3'>
                    {user?.coins}
                </Typography>
            </Box>

        </>
    )
}


export default Navbar;
