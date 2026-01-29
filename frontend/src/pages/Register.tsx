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
    Link,
    Checkbox,
    FormControlLabel,
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
    Email,
    Lock,
    Person,
} from '@mui/icons-material';
import axios from 'axios';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormData({ ...formData, [field]: value });

        if (field === 'email') {
            if (value && !validateEmail(value)) {
                setEmailError('Invalid email format');
            } else {
                setEmailError('');
            }
        }

        if (field === 'confirmPassword' || field === 'password') {
            if (field === 'confirmPassword' && value !== formData.password) {
                setPasswordError('Passwords do not match');
            } else if (field === 'password' && formData.confirmPassword && value !== formData.confirmPassword) {
                setPasswordError('Passwords do not match');
            } else {
                setPasswordError('');
            }
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!validateEmail(formData.email)) {
            setEmailError('Invalid email format');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            return;
        }

        if (!acceptTerms) {
            setError('Please accept the Terms of Service');
            return;
        }

        try {
            await axios.post('http://localhost:3000/auth/register', {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
            });
            setSuccess(true);
            setTimeout(() => navigate('/login'), 2000);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
            console.error(err);
        }
    };

    const inputSx = {
        mb: 2,
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

    if (success) {
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
                            textAlign: 'center',
                        }}
                    >
                        <Typography variant="h5" sx={{ color: '#fff', mb: 2 }}>
                            Registration Successful!
                        </Typography>
                        <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                            Redirecting to login...
                        </Typography>
                    </Box>
                </Card>
            </Box>
        );
    }

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
                            Create Account
                        </Typography>
                        <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', mt: 0.5 }}>
                            Join SCADA IoT Platform
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

                    <form onSubmit={handleRegister}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                fullWidth
                                label="First Name"
                                value={formData.firstName}
                                onChange={handleChange('firstName')}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Person sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={inputSx}
                            />
                            <TextField
                                fullWidth
                                label="Last Name"
                                value={formData.lastName}
                                onChange={handleChange('lastName')}
                                sx={inputSx}
                            />
                        </Box>
                        <TextField
                            fullWidth
                            label="Email"
                            value={formData.email}
                            onChange={handleChange('email')}
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
                        <TextField
                            fullWidth
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={handleChange('password')}
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
                                            sx={{ color: 'rgba(255, 255, 255, 0.5)' }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={inputSx}
                        />
                        <TextField
                            fullWidth
                            label="Confirm Password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={formData.confirmPassword}
                            onChange={handleChange('confirmPassword')}
                            error={!!passwordError}
                            helperText={passwordError}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            sx={{ color: 'rgba(255, 255, 255, 0.5)' }}
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={inputSx}
                        />

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={acceptTerms}
                                    onChange={(e) => setAcceptTerms(e.target.checked)}
                                    sx={{
                                        color: 'rgba(255, 255, 255, 0.5)',
                                        '&.Mui-checked': { color: '#ff9800' },
                                    }}
                                />
                            }
                            label={
                                <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.85rem' }}>
                                    I accept the Terms of Service and Privacy Policy
                                </Typography>
                            }
                            sx={{ mb: 2 }}
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
                                py: 1.5,
                                textTransform: 'none',
                                boxShadow: '0 4px 14px rgba(255, 152, 0, 0.4)',
                                '&:hover': {
                                    backgroundColor: '#f57c00',
                                    boxShadow: '0 6px 20px rgba(255, 152, 0, 0.5)',
                                },
                            }}
                        >
                            Create Account
                        </Button>
                    </form>

                    <Box sx={{ textAlign: 'center', mt: 3 }}>
                        <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>
                            Already have an account?{' '}
                            <Link
                                component={RouterLink}
                                to="/login"
                                sx={{
                                    color: '#ff9800',
                                    textDecoration: 'none',
                                    '&:hover': { textDecoration: 'underline' },
                                }}
                            >
                                Sign in
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Card>
        </Box>
    );
};

export default Register;
