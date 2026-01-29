import React, { useState } from 'react';
import {
    Box,
    Button,
    Card,
    TextField,
    Typography,
    Alert,
    IconButton,
    InputAdornment,
    Divider,
    Link,
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
    Email,
    Lock,
    Google,
    GitHub,
    Apple,
} from '@mui/icons-material';
import axios from 'axios';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        if (value && !validateEmail(value)) {
            setEmailError('Invalid email format');
        } else {
            setEmailError('');
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!validateEmail(email)) {
            setEmailError('Invalid email format');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/auth/login', {
                username: email,
                password
            });
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/dashboard');
        } catch (err) {
            setError('Login failed. Please check your credentials.');
            console.error(err);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                background: `
                    radial-gradient(ellipse at center, rgba(48, 86, 128, 0.3) 0%, transparent 70%),
                    linear-gradient(135deg, #e8eef5 0%, #dce5f0 50%, #d0dbe8 100%)
                `,
                padding: 2,
            }}
        >
            <Card
                sx={{
                    maxWidth: 420,
                    width: '100%',
                    borderRadius: 3,
                    boxShadow: '0 8px 40px rgba(30, 58, 95, 0.25)',
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        background: 'linear-gradient(180deg, #305680 0%, #1e3a5f 100%)',
                        padding: 4,
                    }}
                >
                    {/* Logo and Title */}
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                        <Box
                            sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 60,
                                height: 60,
                                borderRadius: 2,
                                background: 'rgba(255, 255, 255, 0.1)',
                                mb: 2,
                            }}
                        >
                            <Typography
                                variant="h4"
                                sx={{
                                    color: '#fff',
                                    fontWeight: 700,
                                    fontFamily: '"Inter", "Roboto", sans-serif',
                                }}
                            >
                                S
                            </Typography>
                        </Box>
                        <Typography
                            variant="h5"
                            sx={{
                                color: '#fff',
                                fontWeight: 600,
                                fontFamily: '"Inter", "Roboto", sans-serif',
                                letterSpacing: 0.5,
                            }}
                        >
                            SCADA IoT
                        </Typography>
                        <Typography
                            sx={{
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontSize: '0.9rem',
                                mt: 0.5,
                            }}
                        >
                            Industrial IoT Platform
                        </Typography>
                    </Box>

                    {/* OAuth Buttons */}
                    <Box sx={{ mb: 3 }}>
                        <Typography
                            sx={{
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontSize: '0.85rem',
                                textAlign: 'center',
                                mb: 2,
                            }}
                        >
                            Sign in with
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center' }}>
                            <Button
                                variant="outlined"
                                startIcon={<Google />}
                                sx={{
                                    flex: 1,
                                    color: '#fff',
                                    borderColor: 'rgba(255, 255, 255, 0.3)',
                                    '&:hover': {
                                        borderColor: '#fff',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                    },
                                    textTransform: 'none',
                                    fontWeight: 500,
                                }}
                            >
                                Google
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<GitHub />}
                                sx={{
                                    flex: 1,
                                    color: '#fff',
                                    borderColor: 'rgba(255, 255, 255, 0.3)',
                                    '&:hover': {
                                        borderColor: '#fff',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                    },
                                    textTransform: 'none',
                                    fontWeight: 500,
                                }}
                            >
                                GitHub
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<Apple />}
                                sx={{
                                    flex: 1,
                                    color: '#fff',
                                    borderColor: 'rgba(255, 255, 255, 0.3)',
                                    '&:hover': {
                                        borderColor: '#fff',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                    },
                                    textTransform: 'none',
                                    fontWeight: 500,
                                }}
                            >
                                Apple
                            </Button>
                        </Box>
                    </Box>

                    {/* Divider */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Divider sx={{ flex: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }} />
                        <Typography sx={{ px: 2, color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.85rem' }}>
                            OR
                        </Typography>
                        <Divider sx={{ flex: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }} />
                    </Box>

                    {/* Error Alert */}
                    {error && (
                        <Alert
                            severity="error"
                            sx={{
                                mb: 2,
                                backgroundColor: 'rgba(211, 47, 47, 0.15)',
                                color: '#ff6b6b',
                                '& .MuiAlert-icon': { color: '#ff6b6b' },
                            }}
                        >
                            {error}
                        </Alert>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleLogin}>
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={handleEmailChange}
                            error={!!emailError}
                            helperText={emailError}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                mb: 2,
                                '& .MuiOutlinedInput-root': {
                                    color: '#fff',
                                    '& fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.3)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.5)',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#ff9800',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    '&.Mui-focused': {
                                        color: '#ff9800',
                                    },
                                },
                                '& .MuiFormHelperText-root': {
                                    color: '#ff6b6b',
                                },
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                            sx={{ color: 'rgba(255, 255, 255, 0.5)' }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                mb: 3,
                                '& .MuiOutlinedInput-root': {
                                    color: '#fff',
                                    '& fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.3)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.5)',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#ff9800',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    '&.Mui-focused': {
                                        color: '#ff9800',
                                    },
                                },
                            }}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            type="submit"
                            sx={{
                                backgroundColor: '#ff9800',
                                color: '#fff',
                                fontWeight: 600,
                                fontSize: '1rem',
                                py: 1.5,
                                textTransform: 'none',
                                boxShadow: '0 4px 14px rgba(255, 152, 0, 0.4)',
                                '&:hover': {
                                    backgroundColor: '#f57c00',
                                    boxShadow: '0 6px 20px rgba(255, 152, 0, 0.5)',
                                },
                            }}
                        >
                            Sign in
                        </Button>
                    </form>

                    {/* Footer Links */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mt: 3,
                        }}
                    >
                        <Link
                            component={RouterLink}
                            to="/register"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontSize: '0.9rem',
                                textDecoration: 'none',
                                '&:hover': {
                                    color: '#fff',
                                    textDecoration: 'underline',
                                },
                            }}
                        >
                            Sign up
                        </Link>
                        <Link
                            component={RouterLink}
                            to="/forgot-password"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontSize: '0.9rem',
                                textDecoration: 'none',
                                '&:hover': {
                                    color: '#fff',
                                    textDecoration: 'underline',
                                },
                            }}
                        >
                            Forgot your password?
                        </Link>
                    </Box>
                </Box>
            </Card>
        </Box>
    );
};

export default Login;
