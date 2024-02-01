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
import Avatar from '@mui/material/Avatar';
import UploadFileTwoToneIcon from '@mui/icons-material/UploadFileTwoTone';
import Grid from '@mui/material/Grid';
import { handleError } from '../../../utils/handleInputError';
import { VisuallyHiddenInput } from '../Cards/CreateCards';
import Loader from '../../loader/Loader';
import { handleAvatarUpload, handleUploadImage } from '../../../utils/uploadImage';
import CloseIcon from '@mui/icons-material/Close';
import { deleteChest, editChest } from '../../../redux/actions/chestActions';

const quantityOfCardsList = [1, 2, 3, 4, 5];
const chestTypeList = ["Normal", "Raro", "Épico", "Legendario"]
const regexName = /^[A-Za-z\s.'-]{3,20}$/
const regexDescription = /^.{10,100}$/
const regexPrice = /^([0-9]|[1-9][0-9]{1,3}|10000)$/

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
    justifyContent: 'center',
    overflowY: 'hidden'
};


const ModalEditChest = ({ chestName, chestPrice, chestDescription, chestType, quantityOfCards, chestImage, idChest, onClose }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState(chestName)
    const [nameError, setNameError] = useState(false)
    const [description, setDescription] = useState(chestDescription)
    const [descriptionError, setDescriptionError] = useState(false)
    const [price, setPrice] = useState(chestPrice)
    const [priceError, setPriceError] = useState(false)
    const [type, setType] = useState(chestType)
    const [quantity, setQuantity] = useState(quantityOfCards)
    const [imageUpload, setImageUpload] = useState(chestImage)
    const [loading, setLoading] = useState(false)

    const handleDeleteChest = async () => {
        setLoading(true)
        try {
            await customAlert('¿Eliminar Cofre?', '', 'warning', () => {
                dispatch(deleteChest(idChest))
                    .then(res => {
                        if (res.error) return autoCloseAlert(res.error.message, 'error', 'red');
                        autoCloseAlert('Cofre eliminado', 'success', 'green')
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
        // setLoading(true)
        let chestData = { id: idChest }

        if (nameError || descriptionError || priceError) {
            setLoading(false)
            return autoCloseAlert('Por favor, completa el formulario', 'error', 'red');
        }

        if (name !== chestName) {
            chestData = { ...chestData, name }
        }

        if (price !== chestPrice) {
            chestData = { ...chestData, price }
        }

        if (description !== chestDescription) {
            chestData = { ...chestData, description }
        }

        if (type !== chestType) {
            chestData = { ...chestData, type }
        }

        if (quantity !== quantityOfCards) {
            chestData = { ...chestData, quantity }
        }

        if (imageUpload !== chestImage) {
            const imageChest = await handleAvatarUpload(imageUpload, 'chestsImages')
            chestData = { ...chestData, imageChest }
        }

        try {
            await customAlert('¿Guardar cambios?', '', 'warning', () => {
                dispatch(editChest(chestData))
                    .then(res => {
                        if (res.error) return autoCloseAlert(res.error.message, 'error', 'red');
                        autoCloseAlert('Cofre actualizado', 'success', 'green')
                        setTimeout(() => {
                            window.location.reload()
                        }, 0)
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
                        <Box component="form" noValidate onSubmit={handleUpdateCard} sx={{ py: 2, overflowY: 'auto' }}>
                            <Button
                                sx={{ position: 'absolute', right: 0, top: 0 }}
                                onClick={onClose}
                            >
                                <CloseIcon />
                            </Button>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Box sx={{ position: 'relative' }}>
                                        <Avatar variant="rounded" src={imageUpload} sx={{ width: 100, height: 120 }} />
                                        <Button size="small" sx={{ position: 'absolute', bottom: 0, left: 0, fontSize: 8 }} component="label" variant="contained" startIcon={<UploadFileTwoToneIcon />}>
                                            Subir imagen
                                            <VisuallyHiddenInput type="file" onChange={(e) => handleUploadImage(e, setImageUpload)} accept="image/*" />
                                        </Button>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        size='small'
                                        required
                                        fullWidth
                                        label="Nombre"
                                        onChange={e => handleError(e, setName, setNameError, regexName)}
                                        value={name}
                                        error={nameError}
                                        color={nameError ? '' : 'success'}
                                        helperText={nameError ? 'Nombre de cofre inválido' : ''}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth required variant="outlined">
                                        <TextField
                                            size='small'
                                            required
                                            label="Descripción"
                                            value={description}
                                            error={descriptionError}
                                            color={descriptionError ? '' : 'success'}
                                            helperText={descriptionError ? 'Descripción inválida' : ''}
                                            onChange={e => handleError(e, setDescription, setDescriptionError, regexDescription)}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormControl fullWidth required variant="outlined">
                                        <TextField
                                            size='small'
                                            required
                                            type='number'
                                            label="Precio"
                                            value={price}
                                            error={priceError}
                                            color={priceError ? '' : 'success'}
                                            helperText={priceError ? 'Inválido' : ''}
                                            onChange={e => handleError(e, setPrice, setPriceError, regexPrice)}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="first">Tipo*</InputLabel>
                                        <Select
                                            size='small'
                                            required
                                            value={type}
                                            label="Tipo"
                                            onChange={e => setType(e.target.value)}
                                        >
                                            {chestTypeList.map((type, index) => (
                                                <MenuItem key={index} value={type}>{type}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="first">Cant. de cartas*</InputLabel>
                                        <Select
                                            size='small'
                                            required
                                            value={quantity}
                                            label="Cant. de cartas"
                                            onChange={e => setQuantity(e.target.value)}
                                        >
                                            {quantityOfCardsList.map((numb, index) => (
                                                <MenuItem key={index} value={numb}>{numb}</MenuItem>
                                            ))}
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
                                    onClick={handleDeleteChest}
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

export default ModalEditChest;