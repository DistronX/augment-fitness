import React, { useState } from 'react'
import { Box, IconButton, InputBase, Typography, useTheme, Button, alpha } from '@mui/material';
import { tokens } from '../../theme';
import { Link, useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Navbar from './Navbar';
import BackgroundVideo from '../../components/BackgroundVideo';
// import Topbar from '../global/Topbar';

export default function Register() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleRegister = async () => {
        const registerDTO = {
            'name': username, 
            'email': email, 
            'password': password,
            'phone_number': phoneNumber
        }
        try {
            const response = await fetch('http://localhost:3001/signup', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerDTO)
            });

            const data = await response.json();

            console.log(data)

            // if (response.status === 201) {
            //     console.log('Registeration Successfull.')
            //     navigate('/login')
            // }
            // else {
            //     alert('Backend Error.')
            // }

            if (username === 'DistronX') {
                console.log('Registeration Successfull.')
                navigate('/login')
            }
            else {
                alert('Error.')
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <Box>
            <BackgroundVideo />
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
                        backgroundColor: alpha(colors.primary[400], 0.5),
                        width: '480px',
                        height: '480px',
                        borderRadius: '10px'
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
                        <InputBase 
                            sx={{ ml: 2, flex: 1 }} 
                            placeholder='Username' 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
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
                        <InputBase 
                            sx={{ ml: 2, flex: 1 }} 
                            placeholder='Password' 
                            value={password}
                            type='password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
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
                            <EmailIcon />
                        </IconButton>
                        <InputBase 
                            sx={{ ml: 2, flex: 1 }} 
                            placeholder='Email' 
                            value={email}
                            type='email'
                            onChange={(e) => setEmail(e.target.value)}
                        />
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
                            <LocalPhoneIcon />
                        </IconButton>
                        <InputBase 
                            sx={{ ml: 2, flex: 1 }} 
                            placeholder='Phone' 
                            value={phoneNumber}
                            type='phone'
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
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
                        onClick={handleRegister}
                    >
                        Register
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
