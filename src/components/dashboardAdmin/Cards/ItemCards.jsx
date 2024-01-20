import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { cardRarity, pokemonTipes } from '../../../utils/pokemonHelper';
import Avatar from '@mui/material/Avatar';
import UploadFileTwoToneIcon from '@mui/icons-material/UploadFileTwoTone';
import { autoCloseAlert } from '../../../utils/alerts';
import { handleAvatarUpload } from '../../../utils/uploadImage';
import clientAxios from '../../../utils/clientAxios';
import Loader from '../../loader/Loader';

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

const apiUrl = import.meta.env.VITE_URL_BASE_API;
const regexPokedex = /^(?:[1-9]|[1-9][0-9]|1[0-4][0-9]|150|151)$/
const regexName = /^[A-Za-z\s.'-]{3,10}$/

const CreateCards = () => {
    const [pokedexNumber, setPokedexNumber] = useState(1)
    const [pokedexError, setPokedexNumberError] = useState(false)
    const [name, setName] = useState('')
    const [nameError, setNameError] = useState(false)
    const [rarity, setRarity] = useState('')
    const [firstTipe, setFirstTipe] = useState('')
    const [secondTipe, setSecondTipe] = useState('')
    const [imageUpload, setImageUpload] = useState('')
    const [loading, setLoading] = useState(false)

    const handleError = (e, setter, setError, regex) => {
        setter(e.target.value)
        const error = !regex.test(e.target.value)
        setError(error)
    }

    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        if (!file.type.startsWith('image/')) return autoCloseAlert('Archivo no válido', 'error', 'red');

        reader.onload = (e) => {
            const previewImage = e.target.result;
            setImageUpload(previewImage);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        let types = [firstTipe]

        if (nameError || pokedexError || !name || !rarity || !firstTipe || !imageUpload){
            setLoading(false)
            return autoCloseAlert('Todos los campos con * con obligatorios', 'error', 'red');
        }

        if(firstTipe == secondTipe) {
            setLoading(false)
            return autoCloseAlert('No puede tener el mismo tipo dos veces', 'error', 'red')
        }

        if(secondTipe){
            types = [firstTipe, secondTipe]
        }

        const imageCard = await handleAvatarUpload(imageUpload)


        try {
            await clientAxios.post(`${apiUrl}/cards/create`, { imageCard, name, pokedexNumber, rarity, types })
            autoCloseAlert('Carta creada con éxito', 'success', 'green')
            setTimeout(()=> {
                window.location.reload()
            }, 1000)
        } catch (error) {
            console.log(error)
            autoCloseAlert( error.message|| "Ups, ocurrió un error", 'error', 'red');
        } finally{
            setLoading(false)
        }

    };

    return (
        <Container component="main" maxWidth="xs" sx={{ marginBottom: 5, overflowX: 'auto' }}>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
                            <Box sx={{ position: 'relative', margin: '2rem' }}>
                                <Avatar variant="rounded" src={imageUpload} sx={{minWidth: 100, width: { xs: 'auto', sm: 200, md: 300 }, height: { xs: 150, sm: 200, md: 300 } }} />
                                <Button size="small" sx={{ position: 'absolute', bottom: 0, left: 0, fontSize: 8 }} component="label" variant="contained" startIcon={<UploadFileTwoToneIcon />}>
                                    Subir imagen*
                                    <VisuallyHiddenInput type="file" onChange={handleUploadImage} accept="image/*" />
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="name"
                                label="Nombre"
                                name="name"
                                onChange={e => handleError(e, setName, setNameError, regexName)}
                                value={name}
                                error={nameError}
                                color={nameError ? '' : 'success'}
                                helperText={nameError ? 'Nombre de pokemón inválido' : ''}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth required variant="outlined">
                                <TextField
                                    required
                                    id="pokedex"
                                    type='number'
                                    label="Número de pokedex"
                                    value={pokedexNumber}
                                    error={pokedexError}
                                    color={pokedexError ? '' : 'success'}
                                    helperText={pokedexError ? 'El número de pokedex es inválido' : ''}
                                    onChange={e => handleError(e, setPokedexNumber, setPokedexNumberError, regexPokedex)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="first">Rareza*</InputLabel>
                                <Select
                                    required
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={rarity}
                                    label="Tipo 1"
                                    onChange={e => setRarity(e.target.value)}
                                >
                                    {cardRarity.map((rarity, index) => (
                                        <MenuItem key={index} value={rarity}>{rarity}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="first">Tipo 1*</InputLabel>
                                <Select
                                    required
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={firstTipe}
                                    label="Tipo 1"
                                    onChange={e => setFirstTipe(e.target.value)}
                                >
                                    {pokemonTipes.map((tipe, index) => (
                                        <MenuItem key={index} value={tipe}>{tipe}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="second">Tipo 2</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={secondTipe}
                                    label="Tipo 2"
                                    onChange={e => setSecondTipe(e.target.value)}
                                >
                                    {pokemonTipes.map((tipe, index) => (<MenuItem key={index} value={tipe}>{tipe}</MenuItem>))}
                                </Select>
                            </FormControl>
                        </Grid>

                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Crear carta
                    </Button>
                    {loading && <Loader/>}
                </Box>
            </Box>
        </Container>
    )
}

export default CreateCards;