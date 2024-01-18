import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import UploadFileTwoToneIcon from '@mui/icons-material/UploadFileTwoTone';
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';
import { getUser, updateUser } from '../redux/actions/userActions';
import { autoCloseAlert } from '../utils/alerts';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { defaultAvatars } from '../utils/defaultAvatars';
import { handleAvatarUpload } from '../utils/uploadImage';
import Loader from '../components/loader/Loader';
import { useNavigate } from 'react-router-dom';

const strongPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const usernameRegex = /^[a-zA-Z0-9]{8,20}$/;

const confIcon = {
    position: 'absolute', right: 10, top: 15, cursor: 'pointer'
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const UserConfigurationPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.userState);
    const [value, setValue] = useState(null);
    const [actualAvatar, setActualAvatar] = useState(user.avatar.url);
    const [defaultAvatar, setDefaultAvatar] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [oldPasswordError, setOldPasswordError] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordError, setNewPasswordError] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [username, setUsername] = useState(user.username);
    const [usernameError, setUsernameError] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleClickShowPassword = () => setShowOldPassword((show) => !show);
    const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);

    const hasChanges =
        username !== user.username ||
        actualAvatar !== user.avatar.url ||
        oldPassword;


    const handleError = (e, setter, setError, regex) => {
        setter(e.target.value)
        const error = !regex.test(e.target.value)
        setError(error)
    }

    const handleAvatar = (index) => {
        const selectedAvatar = defaultAvatars[index];
        setActualAvatar(selectedAvatar.url);
        setDefaultAvatar(selectedAvatar)
    }

    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        if (!file.type.startsWith('image/')) return autoCloseAlert('Archivo no válido', 'error', 'red');

        reader.onload = (e) => {
            const previewImage = e.target.result;
            setActualAvatar(previewImage)
            setUploadedImage(previewImage);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();

        if (oldPasswordError || newPasswordError || usernameError || oldPassword.length > 0 && newPassword.length == 0){
            setLoading(false)
            return autoCloseAlert('Por favor, rellena bien el formulario', 'error', 'red')
        }

        let avatarUrl;
        let userData = {};

        if (!defaultAvatar && !uploadedImage) {
            userData = { id: user._id };
        } else if (defaultAvatar) {
            avatarUrl = defaultAvatar.url
            userData = { id: user._id, avatar: { url: avatarUrl } };
        } else {
            const avatarUrl = await handleAvatarUpload(uploadedImage)
            userData = { id: user._id, avatar: { url: avatarUrl } }
        }

        if (username !== user.username) {
            userData = { ...userData, username };
        }

        if (oldPassword && newPassword && !oldPasswordError && !newPasswordError) {
            userData = { ...userData, oldPassword, newPassword };
        }

        try {
            await dispatch(updateUser(userData))
            .then(res => {
                if(res.error) return autoCloseAlert(res.error.message, 'error', 'red')
                dispatch(getUser());
                autoCloseAlert('Cambios guardados', 'success', 'green');
                setTimeout(()=> navigate('/'), 2000)
            })
        } catch (error) {
            console.log(error)
            autoCloseAlert('Error al actualizar el usuario', 'error', 'red');
        }finally{
            setLoading(false)
        }

    }

    return (
        <Container disableGutters>
            <Box sx={{ display: 'flex'}}>
                <Box sx={{ position: 'relative' }}>
                    <Avatar variant="rounded" src={actualAvatar} sx={{ width: 200, height: 200 }} />
                    <Button size="small" sx={{ position: 'absolute', bottom: 0, right: 0 }} component="label" variant="contained" startIcon={<UploadFileTwoToneIcon />}>
                        Subir imagen
                        <VisuallyHiddenInput type="file" onChange={handleUploadImage} accept="image/*" />
                    </Button>
                </Box>
                <Box sx={{ my: 5 }}>
                    <BottomNavigation
                        sx={{ display: 'flex', flexWrap: 'wrap' }}
                        showLabels
                        value={value}
                        onChange={(e, newValue) => {
                            setValue(newValue);
                        }}>
                        {defaultAvatars.map((avatar, index) => (
                            <BottomNavigationAction onClick={() => handleAvatar(index)} sx={{ fontWeight: 'bolder' }} key={index} label={avatar.name} icon={<Avatar variant="rounded" src={avatar.url} alt={avatar.name} sx={{ width: 64, height: 64 }} />} />
                        ))}
                    </BottomNavigation>
                </Box>
            </Box>
                <Box component="form" fullWidth noValidate onSubmit={handleSubmit} sx={{ mt: 3, p: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Grid container direction='column' spacing={2} maxWidth='sm'>
                        <Grid item>
                            <TextField
                                fullWidth
                                id="username"
                                label="Nombre de Usuario"
                                name="username"
                                autoComplete="username"
                                onChange={e => handleError(e, setUsername, setUsernameError, usernameRegex)}
                                value={username}
                                error={usernameError}
                                color={usernameError ? '' : 'success'}
                                helperText={usernameError ? 'Debe ser de 8 a 20 caracteres (letras y/o números)' : ''}
                            />
                        </Grid>
                        <Grid item>
                            <FormControl fullWidth required variant="outlined">
                                <TextField
                                    id="password"
                                    type={showOldPassword ? 'text' : 'password'}
                                    label="Contraseña actual"
                                    value={oldPassword}
                                    error={oldPasswordError}
                                    color={oldPasswordError ? '' : 'success'}
                                    helperText={oldPasswordError ? 'La contraseña debe tener al menos 8 carácteres y contener al menos una letra mayúscula, una letra minúscula y un número' : ''}
                                    onChange={e => handleError(e, setOldPassword, setOldPasswordError, strongPasswordRegex)}
                                />
                                {showOldPassword ? <VisibilityOff sx={confIcon} onClick={handleClickShowPassword} /> : <Visibility sx={confIcon} onClick={handleClickShowPassword} />}
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl fullWidth required variant="outlined">
                                <TextField
                                    required={oldPasswordError}
                                    id="password2"
                                    type={showNewPassword ? 'text' : 'password'}
                                    label="Contraseña nueva"
                                    value={newPassword}
                                    error={newPasswordError}
                                    color={newPasswordError ? '' : 'success'}
                                    helperText={newPasswordError ? 'La contraseña nueva debe tener al menos 8 carácteres y contener al menos una letra mayúscula, una letra minúscula y un número' : ''}
                                    onChange={e => handleError(e, setNewPassword, setNewPasswordError, strongPasswordRegex)}
                                />
                                {showNewPassword ? <VisibilityOff sx={confIcon} onClick={handleClickShowNewPassword} /> : <Visibility sx={confIcon} onClick={handleClickShowNewPassword} />}
                            </FormControl>
                        </Grid>
                    </Grid>
                    {loading && <Loader />}
                    <Button
                        disabled={!hasChanges}
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {loading ? 'Guardando...' : 'Guardar cambios'}
                    </Button>
                </Box>
        </Container>
    )
}

export default UserConfigurationPage;