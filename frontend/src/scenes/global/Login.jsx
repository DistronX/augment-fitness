import React, { useState } from 'react'
import { Box, IconButton, InputBase, Typography, useTheme, Button, Alert, AlertTitle, alpha } from '@mui/material';
import { tokens } from '../../theme';
import { Link, useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { useAuth } from '../../AuthContext';
import Navbar from '../global/Navbar'
import BackgroundVideo from '../../components/BackgroundVideo';


export default function Login() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    // const colorMode = useContext(ColorModeContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            if (email === '' || password === '') {
                throw new Error('Email and password must be provided.')
            }
            const response = await fetch('http://localhost:3001/user/login', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            console.log(data)

            if (response.ok) {
                // If login is successful, you can redirect the user to another page
                // For example, using react-router-dom history.push('/dashboard');
                setLoginStatus('success')
                console.log('Login successful!');
                login(data)
                navigate('/dashboard')
            } else {
                setLoginStatus('error')
                setErrorMessage('Incorrect email or password.');
                console.error('Login failed:', data.message);
            }
        } catch (error) {
            setLoginStatus('error')
            setErrorMessage(error.message);
            console.error('Error during login:', error);
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
                        Login
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
                            <LockIcon />
                        </IconButton>
                        <InputBase
                            sx={{ ml: 2, flex: 1 }}
                            placeholder='Password'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Box>

                    <Link to={'/register'}>
                        <Typography variant='h6' color={colors.greenAccent[500]} style={{ textDecoration: 'underline', marginBottom: '30px' }}>
                            Not registered yet?
                        </Typography>
                    </Link>

                    <Button
                        variant="contained"
                        style={{ width: '300px' }}
                        color='secondary'
                        onClick={handleLogin}
                    >
                        Sign In
                    </Button>

                    {loginStatus === 'success' && (
                        <Alert severity="success" onClose={() => setLoginStatus(null)} sx={{ mt: '20px' }}>
                            <AlertTitle>Success</AlertTitle>
                            Registration successful!
                        </Alert>
                    )}

                    {loginStatus === 'error' && (
                        <Alert severity="error" onClose={() => setLoginStatus(null)} sx={{ mt: '20px' }}>
                            <AlertTitle>Error</AlertTitle>
                            {errorMessage}
                        </Alert>
                    )}
                </Box>
            </Box>
        </Box>
    )
}
