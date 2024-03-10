/* eslint-disable react/prop-types */
import {Backdrop, Box, Modal, Fade, Button, Typography, InputLabel, MenuItem, FormControl, Select, TextField} from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { editUser } from '../../../redux/actions/userActions';
import { customAlert } from '../../../utils/alerts';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '1rem',
};

const coinsRegex = /^\d{1,5}$/;

const ModalEditUser = ({ userId, userBanned, userRole, userCoins, onClose }) => {
    const dispatch = useDispatch();
    const [disabled, setDisabled] = useState(userBanned);
    const [role, setRole] = useState(userRole);
    const [coins, setCoins] = useState(userCoins);
    const [errorCoins, setErrorCoins] = useState(false)

    const handleErrorCoins = (e) =>{
        setCoins(e.target.value)
        if(!coinsRegex.test(e.target.value)){
            return setErrorCoins(true)
        } else{
            return setErrorCoins(false)
        }
    }
    
    const handleUpdateUser = () => {
        if(errorCoins) return

        customAlert('¿Modificar usuario?', ()=>{
            dispatch(editUser({
                id: userId,
                disabled,
                role,
                coins
            }))
            setTimeout(()=>{
                window.location.reload()
            }, 1500)
        })
        
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
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
                        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                            USER ID : {userId}
                        </Typography>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel id="demo-simple-select-label">Baneado</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={disabled}
                                    label="Baneado"
                                    onChange={(e) => setDisabled(e.target.value)}
                                >
                                    <MenuItem value={true}>Si</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel id="demo-simple-select-label">Rol</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={role}
                                    label="Rol"
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <MenuItem value='admin'>Admin</MenuItem>
                                    <MenuItem value='client'>Usuario</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <TextField
                                    fullWidth
                                    id="coins"
                                    label="Coins"
                                    name="coins"
                                    onChange={(e) => handleErrorCoins(e)}
                                    value={coins}
                                    error={errorCoins}
                                    helperText={errorCoins? 'Valor incorrecto' :`Actualmente tiene: ${userCoins}`}
                                />
                            </FormControl>


                            <Button onClick={handleUpdateUser} variant='outlined'>Guardar</Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default ModalEditUser;