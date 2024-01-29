import { useEffect, useState } from "react";
import { handleError } from "../../../utils/handleInputError";
import { cardRarity } from "../../../utils/pokemonHelper";
import Loader from "../../loader/Loader";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import UploadFileTwoToneIcon from '@mui/icons-material/UploadFileTwoTone';
import { VisuallyHiddenInput } from "../Cards/CreateCards";
import { handleAvatarUpload, handleUploadImage } from "../../../utils/uploadImage";
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from "react-redux";
import { getAllCards } from "../../../redux/actions/cardActions";
import { autoCloseAlert } from "../../../utils/alerts";
import clientAxios from "../../../utils/clientAxios";
import { server } from "../../../server";

const quantityOfCardsList = [1, 2, 3, 4, 5];
const chestTypeList = ["Normal", "Raro", "Épico", "Legendario"]
const regexName = /^[A-Za-z\s.'-]{3,20}$/
const regexDescription = /^.{10,100}$/
const regexPrice = /^([0-9]|[1-9][0-9]{1,3}|10000)$/

const CreateChests = () => {
    const dispatch = useDispatch()
    const { cards } = useSelector((state) => state.card)
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(false);
    const [description, setDescription] = useState('');
    const [descriptionError, setDescriptionError] = useState(false);
    const [chestType, setChestType] = useState('');
    const [price, setPrice] = useState(0);
    const [priceError, setPriceError] = useState(false);
    const [rarityOfCards, setRarityOfCards] = useState('');
    const [quantityOfCards, setQuantityOfCards] = useState(1);
    const [imageUpload, setImageUpload] = useState('')
    const [selectedCards, setSelectedCards] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        dispatch(getAllCards())
    }, [])

    const filterCardsByRarity = (rarity) => {
        const filtered = cards.filter(card => card.rarity !== rarity);
        setFilteredCards(filtered);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (!imageUpload || !name || !description || !chestType) {
            setLoading(false)
            return autoCloseAlert('Los campos con * son obligatorios', 'error', 'red');
        }

        if (nameError || descriptionError || priceError) {
            setLoading(false)
            return autoCloseAlert('Por favor, completa el formulario', 'error', 'red');
        }

        if (!rarityOfCards && selectedCards.length === 0) {
            setLoading(false)
            return autoCloseAlert('El cofre debe tener al menos una carta o el tipo de cartas', 'error', 'red');
        }

        const chestImage = await handleAvatarUpload(imageUpload, 'chestsImages');

        let chestData = { chestImage, name, description, chestType, quantityOfCards, price };

        if (rarityOfCards) {
            chestData = { ...chestData, rarityOfCards }
        }

        if (selectedCards) {
            chestData = { ...chestData, selectedCards }
        }

        try {
            await clientAxios.post(`${server}/chests/create`, chestData, { withCredentials: true })
            autoCloseAlert('Cofre creado con éxito', 'success', 'green')
            setTimeout(()=> {
                window.location.reload()
            }, 1000)
        } catch (error) {
            autoCloseAlert(error.message || "Ups, ocurrió un error", 'error', 'red');
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ px: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box sx={{ position: 'relative' }}>
                            <Avatar variant="rounded" src={imageUpload} sx={{ minWidth: 100, width: { xs: 'auto', sm: 200, md: 300 }, height: { xs: 150, sm: 150, md: 200 } }} />
                            <Button size="small" sx={{ position: 'absolute', bottom: 0, left: 0, fontSize: 8 }} component="label" variant="contained" startIcon={<UploadFileTwoToneIcon />}>
                                Subir imagen*
                                <VisuallyHiddenInput type="file" onChange={(e) => handleUploadImage(e, setImageUpload)} accept="image/*" />
                            </Button>
                        </Box>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            required
                            fullWidth
                            id="name"
                            label="Nombre"
                            onChange={e => handleError(e, setName, setNameError, regexName)}
                            value={name}
                            error={nameError}
                            color={nameError ? '' : 'success'}
                            helperText={nameError ? 'Nombre de cofre inválido' : ''}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth required variant="outlined">
                            <TextField
                                required
                                fullWidth
                                id="description"
                                label="Descripción"
                                value={description}
                                error={descriptionError}
                                color={descriptionError ? '' : 'success'}
                                helperText={descriptionError ? 'Descripción no válida' : ''}
                                onChange={e => handleError(e, setDescription, setDescriptionError, regexDescription)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="rarity">Tipo de cofre*</InputLabel>
                            <Select
                                required
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={chestType}
                                label="Tipo de cofre"
                                onChange={e => setChestType(e.target.value)}
                            >
                                {chestTypeList.map((rarity, index) => (
                                    <MenuItem key={index} value={rarity}>{rarity}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth required variant="outlined">
                            <TextField
                                id="price"
                                type='number'
                                label="Precio"
                                value={price}
                                error={priceError}
                                color={priceError ? '' : 'success'}
                                helperText={priceError ? 'Precio no válido' : ''}
                                onChange={e => handleError(e, setPrice, setPriceError, regexPrice)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="rarity">Rareza de cartas*</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={rarityOfCards}
                                label="Rareza de cartas"
                                onChange={(e) => {
                                    setRarityOfCards(e.target.value);
                                    filterCardsByRarity(e.target.value);
                                }}
                            >
                                {cardRarity.map((rarity, index) => (
                                    <MenuItem key={index} value={rarity}>{rarity}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="first">Cantidad de cartas</InputLabel>
                            <Select
                                required
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={quantityOfCards}
                                label="Cantidad de cartas"
                                onChange={e => setQuantityOfCards(e.target.value)}
                            >
                                {quantityOfCardsList.map((quantity, index) => (
                                    <MenuItem key={index} value={quantity}>{quantity}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            size="small"
                            multiple
                            id="tags-outlined"
                            options={filteredCards.length == 0 ?
                                cards.map((card) => card.name)
                                :
                                filteredCards.map((card) => card.name)
                            }
                            filterSelectedOptions
                            value={selectedCards}
                            onChange={(event, newValue) => {
                                setSelectedCards(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Agregar manualmente"
                                    placeholder="Buscar carta"
                                />
                            )}
                        />
                    </Grid>

                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Crear cofre
                </Button>
                {loading && <Loader />}
            </Box>
        </>
    )
}

export default CreateChests;