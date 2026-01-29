import React, { useState } from 'react';
import {
    Box,
    Button,
    Card,
    TextField,
    Typography,
    Alert,
    InputAdornment,
    Link,
} from '@mui/material';
import { Email, ArrowBack } from '@mui/icons-material';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!validateEmail(email)) {
            setEmailError('Invalid email format');
            return;
        }

        setLoading(true);
        try {
            await axios.post('http://localhost:3000/auth/forgot-password', { email });
            setSuccess(true);
        } catch (err: any) {
            // Don't reveal if email exists or not for security
            setSuccess(true);
        } finally {
            setLoading(false);
        }
    };

    const inputSx = {
        mb: 3,
        '& .MuiOutlinedInput-root': {
            color: '#fff',
            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
            '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
            '&.Mui-focused fieldset': { borderColor: '#ff9800' },
        },
        '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.7)',
            '&.Mui-focused': { color: '#ff9800' },
        },
        '& .MuiFormHelperText-root': { color: '#ff6b6b' },
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
                    {/* Header */}
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
                            <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700 }}>
                                S
                            </Typography>
                        </Box>
                        <Typography variant="h5" sx={{ color: '#fff', fontWeight: 600 }}>
                            Reset Password
                        </Typography>
                        <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', mt: 0.5 }}>
                            {success
                                ? 'Check your email for reset instructions'
                                : 'Enter your email to receive a password reset link'}
                        </Typography>
                    </Box>

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

                    {success ? (
                        <Box sx={{ textAlign: 'center' }}>
                            <Alert
                                severity="success"
                                sx={{
                                    mb: 3,
                                    backgroundColor: 'rgba(46, 125, 50, 0.15)',
                                    color: '#4caf50',
                                    '& .MuiAlert-icon': { color: '#4caf50' },
                                }}
                            >
                                If an account exists with this email, you will receive password reset instructions.
                            </Alert>
                            <Button
                                component={RouterLink}
                                to="/login"
                                startIcon={<ArrowBack />}
                                sx={{
                                    color: '#ff9800',
                                    textTransform: 'none',
                                    '&:hover': { backgroundColor: 'rgba(255, 152, 0, 0.1)' },
                                }}
                            >
                                Back to Sign in
                            </Button>
                        </Box>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Email"
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
                                sx={inputSx}
                            />

                            <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                type="submit"
                                disabled={loading}
                                sx={{
                                    backgroundColor: '#ff9800',
                                    color: '#fff',
                                    fontWeight: 600,
                                    py: 1.5,
                                    textTransform: 'none',
                                    boxShadow: '0 4px 14px rgba(255, 152, 0, 0.4)',
                                    '&:hover': {
                                        backgroundColor: '#f57c00',
                                        boxShadow: '0 6px 20px rgba(255, 152, 0, 0.5)',
                                    },
                                    '&:disabled': {
                                        backgroundColor: 'rgba(255, 152, 0, 0.5)',
                                        color: 'rgba(255, 255, 255, 0.7)',
                                    },
                                }}
                            >
                                {loading ? 'Sending...' : 'Send Reset Link'}
                            </Button>
                        </form>
                    )}

                    {!success && (
                        <Box sx={{ textAlign: 'center', mt: 3 }}>
                            <Link
                                component={RouterLink}
                                to="/login"
                                sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 0.5,
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    fontSize: '0.9rem',
                                    textDecoration: 'none',
                                    '&:hover': { color: '#fff' },
                                }}
                            >
                                <ArrowBack fontSize="small" />
                                Back to Sign in
                            </Link>
                        </Box>
                    )}
                </Box>
            </Card>
        </Box>
    );
};

export default ForgotPassword;
