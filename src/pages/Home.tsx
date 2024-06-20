import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
    return (
        <Container>
            <Box mt={4}>
                <Typography variant="h5" align="center">
                    Добро пожаловать! Нажмите кнопку ниже, чтобы начать тест.
                </Typography>
                <Box display="flex" justifyContent="center" mt={4}>
                    <Link to="/test">
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#b82833",
                                "&:hover": {
                                    backgroundColor: "#66141b",
                                },
                            }}
                        >
                            Начать тест
                        </Button>
                    </Link>
                </Box>
            </Box>
        </Container>
    );
};

export default Home;
