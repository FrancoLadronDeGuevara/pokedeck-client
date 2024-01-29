import { useSelector } from "react-redux";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Button, Typography } from "@mui/material";
import axios from "axios";
import { autoCloseAlert } from "../../utils/alerts";

const apiUrl = import.meta.env.VITE_URL_BASE_API;

const ChestStore = () => {
    const { chests } = useSelector((state) => state.chest)
    const { user } = useSelector((state) => state.user)

    const handleOpenChest = async (chestId) => {
        try {
            await axios.post(`${apiUrl}/chests/openChest`, {userId: user._id, chestId}, {withCredentials: true})
            .then(res => console.log(res.data.cards))
            setTimeout(()=> {
                window.location.reload()
            })
        } catch (error) {
            autoCloseAlert(error.response.data.message, 'error', 'red')
        }
    }

    return (
        <>
            {chests.map((chest, index) => (
                <Box
                    key={index}
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 1,
                            width: 200,
                            height: 200,
                        },
                    }}
                >
                    <Paper elevation={3}>
                        <img src={chest.chestImage} alt="" style={{width: 64, height:80}}/>
                        <Typography variant="h4">
                            {chest.price}
                        </Typography>
                        <Button 
                        variant="outlined" 
                        color="success"
                        onClick={() => handleOpenChest(chest._id)}
                        >
                            Abrir cofre
                        </Button>
                    </Paper>
                </Box>
            )
            )}
        </>
    )
}

export default ChestStore;