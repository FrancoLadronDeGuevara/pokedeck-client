import "./RegisterForm.css";

import {
  Avatar,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  FormControl,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import clientAxios from "../../utils/clientAxios";
import { autoCloseAlert } from "../../utils/alerts";
import { handleError } from "../../utils/handleInputError";

import Loader from "../loader/Loader";

const strongPasswordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const strongEmailRegex =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

const confIcon = {
  position: "absolute",
  right: 10,
  top: 15,
  cursor: "pointer",
};

const RegisterForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleErrorConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);

    if (password !== e.target.value) {
      return setConfirmPasswordError(true);
    } else {
      setConfirmPasswordError(false);
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (password !== confirmPassword) setConfirmPasswordError(true);

    if (emailError || passwordError || confirmPasswordError) {
      setLoading(false);
      return autoCloseAlert("Por favor, rellena bien el formulario", "error");
    }

    try {
      await clientAxios
        .post(`/users/create`, { email, password })
        .then((res) => autoCloseAlert(res.data.message, "warning"));
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      const errorMsg = error.errors?.[0]?.msg;
      autoCloseAlert(errorMsg || "Ups, ocurrió un error", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CssBaseline />
      <Container
        maxWidth="sm"
        sx={{
          my: {xs: 12, sm: 2, md: 10},
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100dvh - 85px - 65px)",
        }}
      >
        <Box
          className="register"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "success.main" }}>
            <PersonAddIcon />
          </Avatar>
          <Typography className="link-to" variant="h5">
            Registrarse
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required variant="outlined">
                  <TextField
                    id="password"
                    type={showPassword ? "text" : "password"}
                    label="Contraseña*"
                    value={password}
                    error={passwordError}
                    color={passwordError ? "" : "success"}
                    helperText={
                      passwordError
                        ? "La contraseña debe tener al menos 8 carácteres y contener al menos una letra mayúscula, una letra minúscula y un número"
                        : ""
                    }
                    onChange={(e) =>
                      handleError(
                        e,
                        setPassword,
                        setPasswordError,
                        strongPasswordRegex
                      )
                    }
                  />
                  {showPassword ? (
                    <VisibilityOff
                      sx={confIcon}
                      onClick={handleClickShowPassword}
                    />
                  ) : (
                    <Visibility
                      sx={confIcon}
                      onClick={handleClickShowPassword}
                    />
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required variant="outlined">
                  <TextField
                    id="password2"
                    type={showConfirmPassword ? "text" : "password"}
                    label="Repetir Contraseña*"
                    value={confirmPassword}
                    error={confirmPasswordError}
                    color={confirmPasswordError ? "" : "success"}
                    helperText={
                      confirmPasswordError ? "Las contraseñas no coinciden" : ""
                    }
                    onChange={(e) => handleErrorConfirmPassword(e)}
                  />
                  {showConfirmPassword ? (
                    <VisibilityOff
                      sx={confIcon}
                      onClick={handleClickShowConfirmPassword}
                    />
                  ) : (
                    <Visibility
                      sx={confIcon}
                      onClick={handleClickShowConfirmPassword}
                    />
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography className="link-to">
                  Al completar el registro, recibirás un correo electrónico con
                  un link para activar tu cuenta.
                </Typography>
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button type="submit" className="register-button">
                Registrarme
              </button>
            </Box>
            <Box display="flex" justifyContent="flex-end">
              <Typography className="link-to">
                Ya tienes una cuenta?
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    color: "rgb(255, 255, 0)",
                    fontWeight: "bolder",
                    marginLeft: 10,
                  }}
                >
                  Inicia sesión
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
      {loading && <Loader />}
    </>
  );
};

export default RegisterForm;
