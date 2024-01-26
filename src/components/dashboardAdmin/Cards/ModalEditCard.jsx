/* eslint-disable react/prop-types */
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { autoCloseAlert, customAlert } from '../../../utils/alerts';
import { cardRarity, firstTypeList, secondTypeList } from '../../../utils/pokemonHelper';
import Avatar from '@mui/material/Avatar';
import UploadFileTwoToneIcon from '@mui/icons-material/UploadFileTwoTone';
import Grid from '@mui/material/Grid';
import { handleError } from '../../../utils/handleInputError';
import { VisuallyHiddenInput } from './CreateCards';
import Loader from '../../loader/Loader';
import { handleAvatarUpload } from '../../../utils/uploadImage';
import CloseIcon from '@mui/icons-material/Close';
import { deleteCard, editCard } from '../../../redux/actions/cardActions';

const regexPokedex = /^(?:[1-9]|[1-9][0-9]|1[0-4][0-9]|150|151)$/
const regexName = /^[A-Za-z\s.'-]{3,10}$/

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -45%)',
    minWidth: 250,
    height: 450,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    px: 3,
    borderRadius: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowY: 'hidden'
};


const ModalEditCard = ({ idCard, pokedex, pokemonName, pokemonTypes, pokemonRarity, cardImage, onClose }) => {
    const dispatch = useDispatch();
    const [pokedexNumber, setPokedexNumber] = useState(pokedex)
    const [pokedexError, setPokedexNumberError] = useState(false)
    const [name, setName] = useState(pokemonName)
    const [nameError, setNameError] = useState(false)
    const [rarity, setRarity] = useState(pokemonRarity)
    const [firstType, setFirstType] = useState(pokemonTypes[0])
    const [secondType, setSecondType] = useState(pokemonTypes.length > 1 ? pokemonTypes[1] : '')
    const [imageUpload, setImageUpload] = useState(cardImage)
    const [loading, setLoading] = useState(false)

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

    const handleDeleteCard = async () => {
        setLoading(true)
        try {
            await customAlert('¿Eliminar Carta?', '', 'warning', () => {
                dispatch(deleteCard(idCard))
                    .then(res => {
                        if (res.error) return autoCloseAlert(res.error.message, 'error', 'red');
                        autoCloseAlert('Carta eliminada', 'success', 'green')
                        setTimeout(() => {
                            window.location.reload()
                        }, 1000)
                    })
            })
        } catch (error) {
            console.log(error)
            autoCloseAlert(error.message || "Ups, ocurrió un error", 'error', 'red');
        } finally {
            setLoading(false)
        }
    }

    const handleUpdateCard = async (e) => {
        e.preventDefault()
        setLoading(true)
        let cardData = { id: idCard }

        if (nameError || pokedexError) {
            setLoading(false)
            return autoCloseAlert('Por favor, completa bien el formulario', 'error', 'red');
        }

        if (firstType == secondType) {
            setLoading(false)
            return autoCloseAlert('No puede tener el mismo tipo dos veces', 'error', 'red')
        }

        if (pokedexNumber !== pokedex) {
            cardData = { ...cardData, pokedexNumber }
        }

        if (name !== pokemonName) {
            cardData = { ...cardData, name }
        }

        if (rarity !== pokemonRarity) {
            cardData = { ...cardData, rarity }
        }

        if (firstType !== pokemonTypes[0]) {
            cardData = { ...cardData, firstType }
        }

        if (secondType && secondType !== pokemonTypes[1]) {
            cardData = { ...cardData, secondType }
        }

        if (imageUpload !== cardImage) {
            const imageCard = await handleAvatarUpload(imageUpload, 'cardsImages')
            cardData = { ...cardData, imageCard }
        }

        try {
            await customAlert('¿Guardar cambios?', '', 'warning', () => {
                dispatch(editCard(cardData))
                    .then(res => {
                        if (res.error) return autoCloseAlert(res.error.message, 'error', 'red');
                        autoCloseAlert('Carta actualizada', 'success', 'green')
                        setTimeout(() => {
                            window.location.reload()
                        }, 1000)
                    })
            })
        } catch (error) {
            console.log(error)
            autoCloseAlert(error.message || "Ups, ocurrió un error", 'error', 'red');
        } finally {
            setLoading(false)
        }

    }

    return (
        <div>
            <Modal
                open={true}
                onClose={onClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={true}>
                    <Box sx={style}>
                        <Box component="form" noValidate onSubmit={handleUpdateCard} sx={{ mt: 3 }}>
                            <Button
                            sx={{position: 'absolute', right: 0, top: 0}}
                            onClick={onClose}
                            >
                                <CloseIcon/>
                            </Button>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Box sx={{ position: 'relative' }}>
                                        <Avatar variant="rounded" src={imageUpload} sx={{ width: 100, height: 150 }} />
                                        <Button size="small" sx={{ position: 'absolute', bottom: 0, left: 0, fontSize: 8 }} component="label" variant="contained" startIcon={<UploadFileTwoToneIcon />}>
                                            Subir imagen
                                            <VisuallyHiddenInput type="file" onChange={handleUploadImage} accept="image/*" />
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
                                            size='small'
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
                                            size='small'
                                            required
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={firstType}
                                            label="Tipo 1"
                                            onChange={e => setFirstType(e.target.value)}
                                        >
                                            {firstTypeList.map((type, index) => (
                                                <MenuItem key={index} value={type}>{type}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="second">Tipo 2</InputLabel>
                                        <Select
                                            size='small'
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={secondType}
                                            label="Tipo 2"
                                            onChange={e => setSecondType(e.target.value)}
                                        >
                                            {secondTypeList.map((type, index) => (<MenuItem key={index} value={type}>{type}</MenuItem>))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                            </Grid>
                            <Box sx={{ display: 'flex' }}>
                                <Button
                                    size='small'
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color='success'
                                    sx={{ mt: 1, mr: 2 }}
                                >
                                    Guardar
                                </Button>
                                <Button
                                    size='small'
                                    fullWidth
                                    variant='contained'
                                    color='error'
                                    sx={{ mt: 1 }}
                                    onClick={handleDeleteCard}
                                >
                                    Eliminar
                                </Button>
                            </Box>
                            {loading && <Loader />}
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default ModalEditCard;