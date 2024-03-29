
import { styled, FormControl, InputLabel, MenuItem, Select, Container, Box, Grid, TextField, CssBaseline, Button, Avatar } from '@mui/material';
import UploadFileTwoToneIcon from '@mui/icons-material/UploadFileTwoTone';
import { useState } from 'react';

import { cardRarity, firstTypeList, secondTypeList } from '../../../utils/pokemonHelper';
import { autoCloseAlert } from '../../../utils/alerts';
import { handleAvatarUpload, handleUploadImage } from '../../../utils/uploadImage';
import { handleError } from '../../../utils/handleInputError';
import clientAxios from '../../../utils/clientAxios';

import Loader from '../../loader/Loader';

export const VisuallyHiddenInput = styled('input')({
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

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        let types = [firstTipe]

        if (nameError || pokedexError || !name || !rarity || !firstTipe || !imageUpload){
            setLoading(false)
            return autoCloseAlert('Todos los campos con * con obligatorios', 'error');
        }

        if(firstTipe == secondTipe) {
            setLoading(false)
            return autoCloseAlert('No puede tener el mismo tipo dos veces', 'error')
        }

        if(secondTipe){
            if(secondTipe == "SIN 2° TIPO"){
                types = [firstTipe]
            }else{
                types = [firstTipe, secondTipe]
            }
        }

        const imageCard = await handleAvatarUpload(imageUpload, 'cardsImages')


        try {
            await clientAxios.post(`/cards/create`, { imageCard, name, pokedexNumber, rarity, types })
            autoCloseAlert('Carta creada con éxito', 'success')
            setTimeout(()=> {
                window.location.reload()
            }, 1000)
        } catch (error) {
            console.log(error)
            autoCloseAlert( error.message|| "Ups, ocurrió un error", 'error');
        } finally{
            setLoading(false)
        }

    };

    return (
        <Container component="main" maxWidth="xs" sx={{ marginBottom: 5, overflowX: 'auto', pt: 10}}>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box component="form" noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
                            <Box sx={{ position: 'relative'}}>
                                <Avatar variant="rounded" src={imageUpload} sx={{minWidth: 100, width: { xs: 'auto', sm: 150, md: 200 }, height: { xs: 150, sm: 200, md: 300 } }} />
                                <Button size="small" sx={{ position: 'absolute', bottom: 0, left: 0, fontSize: 8 }} component="label" variant="contained" startIcon={<UploadFileTwoToneIcon />}>
                                    Subir imagen*
                                    <VisuallyHiddenInput type="file" onChange={(e) => handleUploadImage(e, setImageUpload)} accept="image/*" />
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            size='small'
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
                                size='small'
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
                                    labelId="Tipo 1"
                                    id="Tipo 1"
                                    value={firstTipe}
                                    label="Tipo 1"
                                    onChange={e => setFirstTipe(e.target.value)}
                                >
                                    {firstTypeList.map((tipe, index) => (
                                        <MenuItem key={index} value={tipe}>{tipe}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="second">Tipo 2</InputLabel>
                                <Select
                                    labelId="Tipo 2"
                                    id="Tipo 2"
                                    value={secondTipe}
                                    label="Tipo 2"
                                    onChange={e => setSecondTipe(e.target.value)}
                                >
                                    {secondTypeList.map((tipe, index) => (<MenuItem key={index} value={tipe}>{tipe}</MenuItem>))}
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