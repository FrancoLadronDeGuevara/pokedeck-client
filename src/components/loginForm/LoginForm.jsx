import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import { Link, useNavigate } from 'react-router-dom';
import { setLocalStorage } from '../../utils/localStorageHelper';
import { autoCloseAlert } from '../../utils/alerts';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/userActions';
import { useState } from 'react';

const confIcon = {
    position: 'absolute', right: 10, top: 30, cursor: 'pointer'
}

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataForm = new FormData(e.currentTarget);

        await dispatch(login({
            email: dataForm.get('email'),
            password: dataForm.get('password')
        })).then(res => {
            if (res.error) return autoCloseAlert(res.error.message, 'error', 'red')
            setLocalStorage('token', res.payload)
            autoCloseAlert('Bienvenido', 'success', 'green');
            setTimeout(() => {
                navigate('/')
                window.location.reload()
            }, 1000)
        })

    };

    return (

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
                    Iniciar Sesión
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <FormControl fullWidth required variant="outlined">
                        <TextField
                            id="password"
                            margin="normal"
                            required
                            fullWidth
                            type={showPassword ? 'text' : 'password'}
                            label="Contraseña"
                            name='password'
                            autoComplete="current-password"
                        />
                        {showPassword ? <VisibilityOff sx={confIcon} onClick={handleClickShowPassword} /> : <Visibility sx={confIcon} onClick={handleClickShowPassword} />}
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
                        <Grid item xs>
                            <Link to='/forgotpassword' variant="body2">
                                Olvidaste tu contraseña?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to='/register' variant="body2">
                                {"No tienes una cuenta? Regístrate"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default LoginForm;