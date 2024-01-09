import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import { autoCloseAlert } from '../../utils/alerts';
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import clientAxios from '../../utils/clientAxios';
import Loader from '../loader/Loader';

const apiUrl = import.meta.env.VITE_URL_BASE_API;
const strongPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const strongEmailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

const confIcon = {
    position: 'absolute', right: 10, top: 15, cursor: 'pointer'
}

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
    const [isChecked, setIsChecked] = useState(false);


    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleErrorEmail = (e) =>{
        setEmail(e.target.value)
        if (!strongEmailRegex.test(e.target.value) ) {
            return setEmailError(true)
        }else{
            setEmailError(false)
        }
    }

    const handleErrorPassword = (e) => {
        setPassword(e.target.value)

        if(!strongPasswordRegex.test(e.target.value)){
            return setPasswordError(true)
        }else{
            setPasswordError(false)
        }
    }

    const handleErrorConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)

        if(password !== e.target.value){
            return setConfirmPasswordError(true)
        }else{
            setConfirmPasswordError(false)
        }
    }

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();

        if(password !== confirmPassword) setConfirmPasswordError(true)

        if(emailError || passwordError || confirmPasswordError || !isChecked){
            setLoading(false)
            return autoCloseAlert('Por favor, rellena bien el formulario', 'error', 'red')
        } 

        try {
            await clientAxios.post(`${apiUrl}/users/create`, {email, password})
            autoCloseAlert('Cuenta creada con éxito', 'success', 'green')
            setEmail('')
            setPassword('')
            setConfirmPassword('')
            setTimeout(()=> navigate('/login'), 2000)
        } catch (error) {
            const errorMsg = error.response?.data?.errors?.[0]?.msg;
            autoCloseAlert( errorMsg || "Ups, ocurrió un error", 'error', 'red');
        } finally{
            setLoading(false)
        }
    };

    return (
        <>
        <Container component="main" maxWidth="xs" sx={{ marginBottom: 5 }}>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Registrarse
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                onChange={e => handleErrorEmail(e)}
                                value={email}
                                error={emailError}
                                color={emailError ? '' : 'success'}
                                helperText={emailError? 'Email inválido' : ''}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth required variant="outlined">
                                <TextField
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    label="Contraseña*"
                                    value={password}
                                    error={passwordError}
                                    color={passwordError? '' : 'success'}
                                    helperText={ passwordError ? 'La contraseña debe tener al menos 8 carácteres y contener al menos una letra mayúscula, una letra minúscula y un número' : ''}
                                    onChange={e => handleErrorPassword(e)}
                                />
                                {showPassword ? <VisibilityOff sx={confIcon} onClick={handleClickShowPassword}/> : <Visibility sx={confIcon}  onClick={handleClickShowPassword}/>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth required variant="outlined">
                            <TextField
                                    id="password2"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    label="Repetir Contraseña*"
                                    value={confirmPassword}
                                    error={confirmPasswordError}
                                    color={confirmPasswordError? '' : 'success'}
                                    helperText={ confirmPasswordError ? 'Las contraseñas no coinciden' : ''}
                                    onChange={e => handleErrorConfirmPassword(e)}
                                />
                                {showConfirmPassword ? <VisibilityOff sx={confIcon} onClick={handleClickShowConfirmPassword}/> : <Visibility sx={confIcon}  onClick={handleClickShowConfirmPassword}/>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" checked={isChecked}
                                onChange={(e) => setIsChecked(e.target.checked)} color="primary" />}
                                label="Acepto los terminos y condiciones"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Registrarme
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to='/login'>
                                Ya tienes una cuenta? Inicia sesión
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
        {loading && <Loader/>}
        </>
    );
}

export default RegisterForm;