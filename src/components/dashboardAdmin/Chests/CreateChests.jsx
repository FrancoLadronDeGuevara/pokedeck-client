import { useState } from "react";
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
import { handleUploadImage } from "../../../utils/uploadImage";
import CardPicker from "./CardPicker";

const quantityOfCardsList = [1, 2, 3, 4, 5];
const chestTypeList = ["Normal", "Raro", "Épico", "Legendario"]
const regexName = /^[A-Za-z\s.'-]{3,10}$/
const regexDescription = /^.{10,100}$/
const regexPrice = /^([0-9]|[1-9][0-9]{1,3}|10000)$/

const CreateChests = () => {
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
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
    }

    return (
        <>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{px: 3}}>
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
                            helperText={nameError ? 'Nombre de pokemón inválido' : ''}
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
                                required
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
                                required
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={rarityOfCards}
                                label="Rareza de cartas"
                                onChange={e => setRarityOfCards(e.target.value)}
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
                        <CardPicker/>
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