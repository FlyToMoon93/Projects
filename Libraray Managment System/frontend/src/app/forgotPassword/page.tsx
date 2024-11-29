"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Paper,
    InputAdornment,
    Alert,
} from '@mui/material';
import { Email } from '@mui/icons-material';
import Layout from "@/app/layout/Layout";
import UserService from "@/api/UserService";

const Page: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const {forgotPassword} = UserService()

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await forgotPassword(email);
            setSuccess("Ein Link zum Zurücksetzen des Passworts wurde an Ihre E-Mail-Adresse gesendet.");
            setEmail("");
        } catch (error) {
            setError("Passwort zurücksetzen fehlgeschlagen. Bitte überprüfen Sie Ihre E-Mail-Adresse und versuchen Sie es erneut.");
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
                    backgroundImage: 'url(/forgot-password-background.jpg)',
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
                        Passwort vergessen
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom sx={{ mb: 4, color: '#555' }}>
                        Geben Sie Ihre E-Mail-Adresse ein, um Ihr Passwort zurückzusetzen.
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
                        {success && <Alert severity="success" sx={{ mb: 3, width: '100%' }}>{success}</Alert>}

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
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={loading}
                            sx={{
                                padding: '10px',
                                borderRadius: '25px',
                                boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
                            }}
                        >
                            {loading ? 'Senden...' : 'Passwort zurücksetzen'}
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Layout>
    );
};

export default Page;
