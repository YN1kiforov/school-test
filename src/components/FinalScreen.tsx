import { Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const FinalScreen = () => {
    return (
        <Box textAlign="center" mt={4}>
            <Typography variant="h4" gutterBottom>
                Тест окончен!
            </Typography>
            <Link to="/">
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#b82833",
                        "&:hover": {
                            backgroundColor: "#66141b",
                        },
                    }}
                >
                    Вернуться на главную
                </Button>
            </Link>
        </Box>
    );
};

export default FinalScreen;
