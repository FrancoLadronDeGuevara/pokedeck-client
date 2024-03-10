import "./Navbar.css";

import {AppBar, Box
  ,Toolbar
  ,IconButton
  ,Typography
  ,Menu
  ,Container
  ,Avatar
  ,Tooltip
  ,MenuItem, Divider, Skeleton} from "@mui/material";
  import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
  import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
  import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
  import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
  import CurrencyRubleOutlinedIcon from "@mui/icons-material/CurrencyRubleOutlined";
import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { customAlert } from "../../utils/alerts";
import clientAxios from "../../utils/clientAxios";

import logoPokedeck from "../../assets/images/logo.webp";
import menuicon from "../../assets/images/icons/menu.webp";
import login from "../../assets/images/icons/login.webp";
import register from "../../assets/images/icons/register.webp";
import pokecard from "../../assets/images/icons/pokecard.webp";
import dropdown from "../../assets/images/backgrounds/dropdown.webp";
import chest from "../../assets/images/icons/chest.webp";


const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);

  const settings = [
    {
      name: "Perfil",
      to: `/profile/${user?.username}`,
      icon: <PersonOutlineOutlinedIcon sx={{ color: "gray" }} />,
    },
    {
      name: "Configuración",
      to: "/userConfiguration",
      icon: <ManageAccountsOutlinedIcon sx={{ color: "gray" }} />,
    },
    {
      name: "Salir",
      to: () => {},
      icon: <LogoutOutlinedIcon sx={{ color: "gray" }} />,
    },
  ];

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
    customAlert("¿Cerrar sesión?", async () => {
      try {
        await clientAxios.get(`/users/logout-user`);
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <>
      <AppBar className="navbar-layout" position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              component={NavLink}
              to="/"
              sx={{ display: { xs: "none", sm: "flex" }, mr: 2 }}
            >
              <img src={logoPokedeck} alt="" width={130} />
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}>
              <IconButton onClick={handleOpenNavMenu}>
                <img src={menuicon} width={50} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  top: 10,
                  display: { xs: "block", sm: "none" },
                  "& .MuiPaper-root": {
                    backgroundImage: `url('${dropdown}')`,
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat",
                    boxShadow: "none",
                    borderBottomRightRadius: 7.5,
                    borderTopLeftRadius: 9,
                  },
                }}
              >
                <NavLink
                  onClick={handleCloseNavMenu}
                  to="/pokedeck"
                  style={{ textDecoration: "none" }}
                >
                  <MenuItem>
                    <img src={pokecard} width={24} />
                    <Typography
                      className="text"
                      textAlign="center"
                      sx={{ marginLeft: 1 }}
                    >
                      Mi Pokedeck
                    </Typography>
                  </MenuItem>
                </NavLink>
                <Divider orientation="horizontal" flexItem />
                <NavLink
                  onClick={handleCloseNavMenu}
                  to="/store"
                  style={{ textDecoration: "none" }}
                >
                  <MenuItem>
                    <img src={chest} width={24} />
                    <Typography
                      className="text"
                      textAlign="center"
                      sx={{ marginLeft: 1 }}
                    >
                      Tienda
                    </Typography>
                  </MenuItem>
                </NavLink>
              </Menu>
            </Box>

            <Box
              component={NavLink}
              to="/"
              sx={{
                display: { xs: "flex", sm: "none" },
                mr: 2,
                flexGrow: 1,
                my: 1,
              }}
            >
              <img src={logoPokedeck} alt="" width={100} />
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}>
              <NavLink
                onClick={handleCloseNavMenu}
                to="/pokedeck"
                style={{ textDecoration: "none" }}
              >
                <MenuItem>
                  <Typography
                    className="title-text"
                    textAlign="center"
                    sx={{ fontSize: 30 }}
                  >
                    Mi Pokedeck
                  </Typography>
                </MenuItem>
              </NavLink>
              <Divider orientation="vertical" flexItem />
              <NavLink
                onClick={handleCloseNavMenu}
                to="/store"
                style={{ textDecoration: "none" }}
              >
                <MenuItem>
                  <Typography
                    className="title-text"
                    textAlign="center"
                    sx={{ fontSize: 30 }}
                  >
                    Tienda
                  </Typography>
                </MenuItem>
              </NavLink>
            </Box>

            {loading && <Skeleton variant="circular" width={50} height={50} />}

            {isAuthenticated && !loading && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Abrir opciones">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      variant="rounded"
                      alt="Image user avatar"
                      src={user?.avatar?.url}
                      sx={{ width: 50, height: 50, marginRight: 1 }}
                    />
                  </IconButton>
                </Tooltip>

                <Menu
                  sx={{
                    mt: "60px",
                    "& .MuiPaper-root": {
                      backgroundImage: `url('${dropdown}')`,
                      backgroundSize: "100% 100%",
                      backgroundRepeat: "no-repeat",
                      boxShadow: "none",
                      borderBottomRightRadius: 7.5,
                      borderTopLeftRadius: 9,
                    },
                  }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {user?.role == "admin" && (
                    <NavLink
                      to="/admin"
                      onClick={handleCloseUserMenu}
                      style={{ textDecoration: "none" }}
                    >
                      <MenuItem>
                        <DashboardOutlinedIcon sx={{ color: "gray" }} />
                        <Typography
                          className="text"
                          textAlign="center"
                          sx={{ marginLeft: 1, fontSize: 20 }}
                        >
                          Dashboard
                        </Typography>
                      </MenuItem>
                    </NavLink>
                  )}
                  {settings.map((setting, index) => (
                    <NavLink
                      key={index}
                      onClick={
                        setting.name == "Salir"
                          ? handleLogoutUser
                          : handleCloseUserMenu
                      }
                      to={setting.to}
                      style={{ textDecoration: "none" }}
                    >
                      <Divider orientation="horizontal" flexItem />
                      <MenuItem>
                        {setting.icon}
                        <Typography
                          className="text"
                          textAlign="center"
                          sx={{ marginLeft: 1, fontSize: 20 }}
                        >
                          {setting.name}
                        </Typography>
                      </MenuItem>
                    </NavLink>
                  ))}
                </Menu>
              </Box>
            )}

            {!loading && !isAuthenticated && (
              <Box sx={{ flexGrow: 0 }}>
                {location.pathname !== "/login" &&
                  location.pathname !== "/register" && (
                    <Box>
                      <Link
                        to="/login"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <IconButton>
                          <img src={login} alt="" width={50} />
                        </IconButton>
                      </Link>
                    </Box>
                  )}
                {location.pathname == "/login" && (
                  <Box>
                    <Link
                      to="/register"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <IconButton>
                        <img src={register} alt="" width={50} />
                      </IconButton>
                    </Link>
                  </Box>
                )}
                {location.pathname == "/register" && (
                  <Box>
                    <Link
                      to="/login"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <IconButton>
                        <img src={login} alt="" width={50} />
                      </IconButton>
                    </Link>
                  </Box>
                )}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {isAuthenticated && !loading && (
        <Box
          className="coins-background"
          sx={{ position: "fixed", top: 73, right: "5%", zIndex: 999 }}
        >
          <Typography variant="h4" className="text">
            <CurrencyRubleOutlinedIcon sx={{ color: "black" }} />
            {user?.coins}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default Navbar;
