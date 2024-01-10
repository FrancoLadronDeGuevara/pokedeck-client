import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Error404Page = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <Typography variant="h1">
                404
            </Typography>
            <Typography variant="h6">
                La página a la que estas intentando acceder no existe
            </Typography>
            <Button onClick={()=> navigate(-1)} variant="contained">Volver atrás</Button>
        </Box>
    );
}

export default Error404Page;