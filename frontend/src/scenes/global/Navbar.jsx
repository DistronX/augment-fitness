import React from 'react'
import { Box, Button, Typography, useTheme } from '@mui/material';
// import { useContext } from 'react';
import { tokens } from '../../theme';
// import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
// import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
// import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    // const colorMode = useContext(ColorModeContext);

    // const { logout } = useAuth()

    const navigate = useNavigate();

    return (
        <Box display='flex' justifyContent='space-between' p={'20px 40px'}>
            <Box>
                <Typography variant='logo'>
                    Augment Fitness
                </Typography>
            </Box>

            <Box display='flex'>
                {/* <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ? (
                        <LightModeOutlinedIcon />
                    ) : (
                        <DarkModeOutlinedIcon />
                    )
                    }
                </IconButton> */}
                <Button variant="outlined" sx={{color: colors.primary[100], borderColor: colors.primary[100], ml: '5px'}} onClick={() => navigate('/register')}>
                    Register
                </Button> 
                <Button variant="contained" color='secondary' sx={{ml: '10px'}} onClick={() => navigate('/login')}>
                    Login
                </Button>
            </Box>
        </Box>
    )
}
