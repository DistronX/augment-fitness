import React, { useState } from 'react'
import { Box, IconButton, InputBase, Typography, useTheme, Button } from '@mui/material';
import { tokens } from '../../theme';
import { Link, useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
// import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { useAuth } from '../../AuthContext';
import Navbar from '../global/Navbar'
// import Topbar from '../global/Topbar';

export default function Login() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    // const colorMode = useContext(ColorModeContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            console.log(data)

            // if (data.success) {
            //     // If login is successful, you can redirect the user to another page
            //     // For example, using react-router-dom history.push('/dashboard');
            //     console.log('Login successful!');
            // } else {
            //     console.error('Login failed:', data.message);
            // }

            if (email === 'admin' && password === 'password') {
                console.log('Login Successfull')
                login('this-is-a-test-token')
                navigate('/dashboard')
            }
            else {
                alert('Incorrect email or password.')
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };


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
                </Box>
            </Box>
        </Box>
    )
}
