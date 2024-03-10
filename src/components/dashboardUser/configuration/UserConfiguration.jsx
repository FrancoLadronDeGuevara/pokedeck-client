import {
  Container,
  Box,
  Avatar,
  Button,
  BottomNavigation,
  BottomNavigationAction,
  FormControl,
  TextField,
  Grid,
  styled,
} from "@mui/material";
import UploadFileTwoToneIcon from "@mui/icons-material/UploadFileTwoTone";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

import { getUser, updateUser } from "../../../redux/actions/userActions";
import { autoCloseAlert } from "../../../utils/alerts";
import { defaultAvatars } from "../../../utils/pokemonHelper";
import { handleAvatarUpload } from "../../../utils/uploadImage";
import { handleError } from "../../../utils/handleInputError";

import Loader from "../../loader/Loader";

const strongPasswordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const usernameRegex = /^[a-zA-Z0-9]{8,20}$/;

const confIcon = {
  position: "absolute",
  right: 10,
  top: 15,
  cursor: "pointer",
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const UserConfiguration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  const [value, setValue] = useState(0);
  const [actualAvatar, setActualAvatar] = useState(user?.avatar?.url);
  const [defaultAvatar, setDefaultAvatar] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [username, setUsername] = useState(user?.username);
  const [usernameError, setUsernameError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickShowPassword = () => setShowOldPassword((show) => !show);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);

  const hasChanges =
    username !== user?.username ||
    actualAvatar !== user?.avatar?.url ||
    oldPassword;

  const handleAvatar = (index) => {
    const selectedAvatar = defaultAvatars[index];
    setActualAvatar(selectedAvatar.url);
    setDefaultAvatar(selectedAvatar);
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (!file.type.startsWith("image/"))
      return autoCloseAlert("Archivo no válido", "error");

    reader.onload = (e) => {
      const previewImage = e.target.result;
      setActualAvatar(previewImage);
      setUploadedImage(previewImage);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    if (
      oldPasswordError ||
      newPasswordError ||
      usernameError ||
      (oldPassword.length > 0 && newPassword.length == 0)
    ) {
      setIsLoading(false);
      return autoCloseAlert(
        "Por favor, rellena bien el formulario",
        "error"
      );
    }

    let avatarUrl;
    let userData = {};

    if (!defaultAvatar && !uploadedImage) {
      userData = { id: user._id };
    } else if (defaultAvatar) {
      avatarUrl = defaultAvatar.url;
      userData = { id: user._id, avatar: { url: avatarUrl } };
    } else {
      const avatarUrl = await handleAvatarUpload(uploadedImage, "avatarsUsers");
      userData = { id: user._id, avatar: { url: avatarUrl } };
    }

    if (username !== user.username) {
      userData = { ...userData, username };
    }

    if (oldPassword && newPassword && !oldPasswordError && !newPasswordError) {
      userData = { ...userData, oldPassword, newPassword };
    }

    try {
      await dispatch(updateUser(userData)).then((res) => {
        if (res.error) return autoCloseAlert(res.error.message, "error");
        dispatch(getUser());
        autoCloseAlert("Cambios guardados", "success");
        setTimeout(() => navigate("/"), 2000);
      });
    } catch (error) {
      console.log(error);
      autoCloseAlert("Error al actualizar el usuario", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container disableGutters>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box sx={{ position: "relative", margin: "2rem" }}>
          <Avatar
            variant="rounded"
            src={actualAvatar}
            sx={{
              width: { xs: 200, sm: 300, md: 400 },
              height: { xs: 200, sm: 300, md: 400 },
            }}
          />
          <Button
            size="small"
            sx={{ position: "absolute", bottom: 0, left: 0 }}
            component="label"
            variant="contained"
            startIcon={<UploadFileTwoToneIcon />}
          >
            Subir imagen
            <VisuallyHiddenInput
              type="file"
              onChange={handleUploadImage}
              accept="image/*"
            />
          </Button>
        </Box>
        <Box maxWidth="md" sx={{ height: { xs: 350, sm: 200 } }}>
          <BottomNavigation
            sx={{
              display: "flex",
              flexWrap: "wrap",
              width: { xs: 300, sm: 550 },
            }}
            showLabels
            value={value}
            onChange={(e, newValue) => {
              setValue(newValue);
            }}
          >
            {defaultAvatars.map((avatar, index) => (
              <BottomNavigationAction
                onClick={() => handleAvatar(index)}
                sx={{ fontWeight: "bolder" }}
                key={index}
                label={avatar.name}
                icon={
                  <Avatar
                    variant="rounded"
                    src={avatar.url}
                    alt={avatar.name}
                    sx={{ width: 64, height: 64 }}
                  />
                }
              />
            ))}
          </BottomNavigation>
        </Box>
      </Box>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{
          px: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid container direction="column" spacing={2} maxWidth="sm">
          <Grid item>
            <TextField
              fullWidth
              id="username"
              label="Nombre de Usuario"
              name="username"
              autoComplete="username"
              onChange={(e) =>
                handleError(e, setUsername, setUsernameError, usernameRegex)
              }
              value={username}
              error={usernameError}
              color={usernameError ? "" : "success"}
              helperText={
                usernameError
                  ? "Debe ser de 8 a 20 caracteres (letras y/o números)"
                  : ""
              }
            />
          </Grid>
          <Grid item>
            <FormControl fullWidth required variant="outlined">
              <TextField
                id="password"
                type={showOldPassword ? "text" : "password"}
                label="Contraseña actual"
                value={oldPassword}
                error={oldPasswordError}
                color={oldPasswordError ? "" : "success"}
                helperText={
                  oldPasswordError
                    ? "La contraseña debe tener al menos 8 carácteres y contener al menos una letra mayúscula, una letra minúscula y un número"
                    : ""
                }
                onChange={(e) =>
                  handleError(
                    e,
                    setOldPassword,
                    setOldPasswordError,
                    strongPasswordRegex
                  )
                }
              />
              {showOldPassword ? (
                <VisibilityOff
                  sx={confIcon}
                  onClick={handleClickShowPassword}
                />
              ) : (
                <Visibility sx={confIcon} onClick={handleClickShowPassword} />
              )}
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl fullWidth required variant="outlined">
              <TextField
                required={oldPasswordError}
                id="password2"
                type={showNewPassword ? "text" : "password"}
                label="Contraseña nueva"
                value={newPassword}
                error={newPasswordError}
                color={newPasswordError ? "" : "success"}
                helperText={
                  newPasswordError
                    ? "La contraseña nueva debe tener al menos 8 carácteres y contener al menos una letra mayúscula, una letra minúscula y un número"
                    : ""
                }
                onChange={(e) =>
                  handleError(
                    e,
                    setNewPassword,
                    setNewPasswordError,
                    strongPasswordRegex
                  )
                }
              />
              {showNewPassword ? (
                <VisibilityOff
                  sx={confIcon}
                  onClick={handleClickShowNewPassword}
                />
              ) : (
                <Visibility
                  sx={confIcon}
                  onClick={handleClickShowNewPassword}
                />
              )}
            </FormControl>
          </Grid>
        </Grid>
        {isLoading && <Loader />}
        <Button
          disabled={!hasChanges}
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {loading ? "Guardando..." : "Guardar cambios"}
        </Button>
      </Box>
    </Container>
  );
};

export default UserConfiguration;
