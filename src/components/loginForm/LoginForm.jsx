import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import { Link, useNavigate } from "react-router-dom";
import { autoCloseAlert } from "../../utils/alerts";
import { useState } from "react";
import { server } from "../../server";
import { handleError } from "../../utils/handleInputError";
import clientAxios from "../../utils/clientAxios";

const confIcon = {
  position: "absolute",
  right: 10,
  top: 30,
  cursor: "pointer",
};

const strongEmailRegex =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!email || !password || emailError) return autoCloseAlert('Por favor, rellena el formulario correctamente', 'error', 'red')

    await clientAxios
      .post(`${server}/users/login-user`, { email, password })
      .then(() => {
        autoCloseAlert("Bienvenido", "success", "green");
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        autoCloseAlert(error.message, "error", "red");
      });
  };

  return (
    <Container component="main" maxWidth="xs" sx={{marginBottom: 5}}>
      <CssBaseline />
      <Box
        sx={{
          paddingTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            onChange={(e) =>
              handleError(e, setEmail, setEmailError, strongEmailRegex)
            }
            value={email}
            error={emailError}
            color={emailError ? "" : "success"}
            helperText={emailError ? "Email inválido" : ""}
          />
          <FormControl fullWidth required variant="outlined">
            <TextField
              id="password"
              margin="normal"
              required
              fullWidth
              value={password}
              type={showPassword ? "text" : "password"}
              label="Contraseña"
              name="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <VisibilityOff sx={confIcon} onClick={handleClickShowPassword} />
            ) : (
              <Visibility sx={confIcon} onClick={handleClickShowPassword} />
            )}
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Ingresar
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/register" variant="body2">
                {"No tienes una cuenta? Regístrate"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
