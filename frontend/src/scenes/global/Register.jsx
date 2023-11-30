import React, { useContext } from 'react'
import { Box, IconButton, InputBase, Typography, useTheme, Button } from '@mui/material';
import { ColorModeContext, tokens } from '../../theme';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import Navbar from './Navbar';
// import Topbar from '../global/Topbar';

export default function Register() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const colorMode = useContext(ColorModeContext);
    return (
        <Box>
            <Box position={'absolute'} width={'100%'}>
                <Navbar />
            </Box>
            <Box display={'flex'} justifyContent={'space-around'} alignItems={'center'} height={'100vh'}>
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    sx={{
                        background: colors.primary[400],
                        width: '500px',
                        height: '500px'
                    }}
                >
                    <Typography variant='h1' color={colors.grey[100]} fontWeight={'bold'} mb={'30px'}>
                        Sign Up
                    </Typography>
                    <Box
                        display='flex'
                        backgroundColor={colors.primary[400]}
                        borderRadius='3px'
                        border={`1px solid ${colors.primary[300]}`}
                        width={'300px'}
                        mb={'20px'}
                    >
                        <IconButton type='button' sx={{ p: 1 }}>
                            <PersonIcon />
                        </IconButton>
                        <InputBase sx={{ ml: 2, flex: 1 }} placeholder='Username' />
                    </Box>
                    <Box
                        display='flex'
                        backgroundColor={colors.primary[400]}
                        borderRadius='3px'
                        border={`1px solid ${colors.primary[300]}`}
                        width={'300px'}
                        mb={'20px'}
                    >
                        <IconButton type='button' sx={{ p: 1 }}>
                            <LockIcon />
                        </IconButton>
                        <InputBase sx={{ ml: 2, flex: 1 }} placeholder='Password' type='password' />
                    </Box>
                    <Box
                        display='flex'
                        backgroundColor={colors.primary[400]}
                        borderRadius='3px'
                        border={`1px solid ${colors.primary[300]}`}
                        width={'300px'}
                        mb={'30px'}
                    >
                        <IconButton type='button' sx={{ p: 1 }}>
                            <EmailIcon />
                        </IconButton>
                        <InputBase sx={{ ml: 2, flex: 1 }} placeholder='Email' type='email' />
                    </Box>

                    <Link to={'/login'}>
                        <Typography variant='h6' color={colors.greenAccent[500]} style={{ textDecoration: 'underline', marginBottom: '30px' }}>
                            Already a member? Login instead.
                        </Typography>
                    </Link>

                    <Button
                        variant="contained"
                        style={{ width: '300px' }}
                        color='secondary'
                    >
                        Register
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
