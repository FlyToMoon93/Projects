"use client";

import React, {useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Paper,
    InputAdornment,
    Alert
} from '@mui/material';
import { Person, Email, Lock, AccountCircle } from '@mui/icons-material';
import Layout from "@/app/layout/Layout";
import useAuth from "@/app/useAuth/useAuth";
import UserService from "@/api/UserService";

const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        role: ''
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const {register} = UserService()

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/'); // Oder eine andere Seite, zu der der Benutzer geleitet werden soll
        }
    }, [isAuthenticated, router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    };

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('token') || ''; // Provide default value



            await register(formData, token);
            setFormData({
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                role: ''
            });
            router.push("/");
        } catch (error) {
            setError("Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <Layout>
            <Container
                maxWidth="sm"
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundImage: 'url(/register-background.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    padding: '20px'
                }}
            >
                <Paper
                    elevation={10}
                    sx={{
                        padding: '30px',
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
                        Registrieren
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom sx={{ mb: 4, color: '#555' }}>
                        Erstellen Sie Ihr Konto, um loszulegen.
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleRegister}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '100%'
                        }}
                    >
                        {error && <Alert severity="error" sx={{ mb: 3, width: '100%' }}>{error}</Alert>}

                        <TextField
                            margin="normal"
                            fullWidth
                            label="Vorname"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleInputChange}
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Person color="primary" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Nachname"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleInputChange}
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Person color="primary" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email color="primary" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Rolle"
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle color="primary" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Passwort"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock color="primary" />
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
                            {loading ? 'Laden...' : 'Registrieren'}
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Layout>
    );
};

export default RegisterPage;
