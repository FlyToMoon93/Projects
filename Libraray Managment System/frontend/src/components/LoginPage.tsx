"use client";

import React, {useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import {
    Container,
    TextField,
    Button,
    Typography,
    Paper,
    Box,
    Alert,
    InputAdornment,
    IconButton,
    CircularProgress, ListItem
} from '@mui/material';
import Link from "next/link";
import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import Layout from "@/app/layout/Layout";
import useAuth from "@/app/useAuth/useAuth";
import UserService from "@/api/UserService";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const {login} = UserService()

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/'); // Oder eine andere Seite, zu der der Benutzer geleitet werden soll
        }
    }, [isAuthenticated, router]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await login(email, password);
            if (response.token) {
                localStorage.setItem("token", response.token);
                localStorage.setItem("role", response.role);
                router.push("/");
            } else {
                throw new Error("Invalid response from server");
            }
        } catch (error) {
            setError("UseAuth failed: Check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <Layout>
            <Container
                maxWidth="sm"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    backgroundImage: 'url(/background.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    padding: '20px'
                }}
            >
                <Paper
                    elevation={10}
                    sx={{
                        padding: '40px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backdropFilter: 'blur(10px)',
                        background: 'rgba(255, 255, 255, 0.8)',
                        borderRadius: '20px',
                        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
                        width: '100%'
                    }}
                >
                    <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                        Willkommen zurück!
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom sx={{ mb: 4, color: '#555' }}>
                        Bitte melden Sie sich an, um fortzufahren.
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '100%'
                        }}
                    >
                        {error && <Alert severity="error" sx={{ mb: 3, width: '100%' }}>{error}</Alert>}
                        <TextField
                            label="Email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ mb: 3 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email color="primary" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            variant="outlined"
                            fullWidth
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{ mb: 3 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock color="primary" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={loading}
                            sx={{
                                mt: 2,
                                padding: '10px',
                                borderRadius: '25px',
                                boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
                            }}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Login'}
                        </Button>
                        <Typography
                            variant="body2"
                            sx={{
                                mt: 3,
                                color: 'primary.main',
                                cursor: 'pointer',
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'underline',
                                    color: 'primary.dark'
                                }
                            }}
                        >
                            <Link href={'/forgotPassword'}>Passwort vergessen?</Link>
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Layout>
    );
};

export default LoginPage;
