"use client";

import React from "react";
import { Typography, Box, Container } from '@mui/material';
import Layout from "@/app/layout/Layout";

const UserDashboard = () => {
    return (
        <Layout>
            <Container
                maxWidth="sm"
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
                    User Dashboard
                </Typography>
                <Typography>
                    Willkommen im Benutzer-Dashboard. Hier können Sie Ihre Aktivitäten verwalten.
                </Typography>
            </Container>
        </Layout>
    );
};

export default UserDashboard;
