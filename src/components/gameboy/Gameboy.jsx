import { Box, Container, Typography } from "@mui/material";
import './Gameboy.css';

const Gameboy = ({ children, score = 0 }) => {
    return (
        <>
            <Container className="gameboy">
                <Box className="gameboy-display">
                {children}
                <Typography className="gameboy-score">
                    SCORE: {score}
                </Typography>
                <Typography className="gameboy-text">
                        GAME BOY
                        <span className="gameboy-text-color">
                            <span className="letter-1">C</span>
                            <span className="letter-2">O</span>
                            <span className="letter-3">L</span>
                            <span className="letter-4">O</span>
                            <span className="letter-5">R</span>
                        </span>
                    </Typography>
                </Box>
            </Container>
        </>
    )
}

export default Gameboy;