"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/app/layout/Layout";
import {Box, Button, Container, Typography} from "@mui/material";

const SettingsPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            // Redirect to login if not authenticated
            router.push('/');
        } else {
            setIsAuthenticated(true);
        }
    }, [router]);

    if (!isAuthenticated) {
        return null; // Show nothing while checking authentication
    }

    return (
        <Layout>
            <Container
                maxWidth="lg"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px',
                    marginTop: "50px",
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Einstellungen
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                        width: '100%',
                    }}
                >
                    <Button  onClick={()=> router.push('/einstellungen/myInfo')} variant="contained" color="success" fullWidth>
                        Persönliche Informationen
                    </Button>
                    <Button  onClick={()=> router.push('/einstellungen/deleteAccount')} variant="contained" color="error" fullWidth>
                        Konto löschen
                    </Button>
                </Box>
            </Container>

        </Layout>
);
};

export default SettingsPage;
