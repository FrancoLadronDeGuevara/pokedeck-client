import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import clientAxios from '../../utils/clientAxios';
import { setLocalStorage } from '../../utils/localStorageHelper';
import { autoCloseAlert } from '../../utils/alerts';


const LoginForm = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataForm = new FormData(e.currentTarget);

        try {
            const { data } = await clientAxios.post('/login', {
            email: dataForm.get('email'),
            password: dataForm.get('password'),
        })
        setLocalStorage("token", data.token);
        autoCloseAlert('Bienvenido', 'success', 'green');
        setTimeout(()=>{
            navigate('/')
            window.location.reload()
        }, 1000)
        } catch (error) {
            autoCloseAlert(error.response.data, 'error', 'red')
        }        
    };

    return (

        <Container component="main" maxWidth="xs" sx={{marginBottom: 5}}>
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
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
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