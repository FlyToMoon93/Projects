"use client";

import React, { useEffect, useState } from "react";
import {
    Container,
    Typography,
    CircularProgress,
    Alert,
    Grid,
    IconButton,
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    DialogTitle,
    Avatar,
    Chip,
    Paper
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Layout from "@/app/layout/Layout";
import { useRouter } from "next/navigation";
import UserService from "@/api/UserService";

interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
}
interface ProfileResponse {
    statusCode: number;
    message: string;
    user: User;
}


const DeleteAccount: React.FC = () => {
    const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [deleting, setDeleting] = useState<boolean>(false);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const router = useRouter();
    const {getUsers, deleteUser} = UserService()
    const [profile, setProfile] = useState<User | null>(null);
    const {getProfile} = UserService()

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/')
                setLoading(false);
                return;
            }

            try {
                const profileResponse: ProfileResponse = await getProfile(token);
                console.log("Profil im Zustand:", profileResponse.user);
                setProfile(profileResponse.user);
            } catch (error) {
                console.error("Fehler beim Laden der Benutzer:", error);
                setError("Fehler beim Laden der Benutzer.");
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                router.push('/');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile().then(r => console.log(r));
    }, [router]);


    const handleDeleteAccount = async () => {
        if (userIdToDelete === null) return;

        setDeleting(true);
        setError(null);
        setSuccess(null);
        const token = localStorage.getItem('token');

        try {
            await deleteUser(userIdToDelete, token ?? "");
            setSuccess("Benutzer erfolgreich gelöscht.");
            setUserIdToDelete(null);
            const updatedUsers = await getUsers(token ?? "");
            setProfile(updatedUsers);
            closeDeleteDialog(); // Schließe den Dialog nach erfolgreichem Löschen
        } catch (error) {
            console.error("Fehler beim Löschen des Benutzers:", error);
            setError("Fehler beim Löschen des Benutzers.");
        } finally {
            setDeleting(false);
        }
    };

    const openDeleteDialog = (userId: number | undefined) => {
        setUserIdToDelete(userId!);
        setOpenDialog(true);
    };

    const closeDeleteDialog = () => {
        setUserIdToDelete(null);
        setOpenDialog(false);
    };

    if (loading) {
        return (
            <Layout>
                <Container maxWidth="sm" sx={{ mt: 5, textAlign: "center" }}>
                    <CircularProgress size={60} />
                </Container>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <Container maxWidth="sm" sx={{ mt: 5 }}>
                    <Alert severity="error" sx={{ textAlign: 'center' }}>
                        {error}
                    </Alert>
                </Container>
            </Layout>
        );
    }

    return (
        <Layout>
            <Container maxWidth="lg" sx={{ mt: 5 }}>
                <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 4, color: 'primary.dark' }}>
                    Benutzerverwaltung
                </Typography>
                <Grid container spacing={4}>
                    { profile &&
                        <Grid item xs={12} sm={6} md={4} key={profile.id}>
                            <Paper
                                elevation={3}
                                sx={{
                                    borderRadius: '16px',
                                    padding: 3,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    background: 'linear-gradient(180deg, #f5f5f5 0%, #e0e0e0 100%)',
                                    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.03)',
                                        boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.3)',
                                    },
                                    position: 'relative'
                                }}
                            >
                                <Avatar
                                    sx={{
                                        bgcolor: 'secondary.main',
                                        width: 80,
                                        height: 80,
                                        fontSize: '2.5rem',
                                        position: 'absolute',
                                        top: '-40px',
                                        border: '4px solid #ffffff',
                                    }}
                                >
                                    {profile.firstname.charAt(0)}
                                </Avatar>
                                <Typography variant="h6" sx={{ fontWeight: '600', mt: 6 }}>
                                    {`${profile.firstname} ${profile.lastname}`}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    ID: {profile.id}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 2 }}>
                                    <strong>Email:</strong> {profile.email}
                                </Typography>
                                <Chip
                                    label={profile.role}
                                    color={profile.role === 'Admin' ? 'primary' : 'default' as 'default' | 'primary'}
                                    sx={{
                                        mt: 2,
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                        letterSpacing: 1,
                                        borderRadius: 4,
                                    }}
                                />
                                <IconButton
                                    aria-label="delete"
                                    onClick={() => openDeleteDialog(profile?.id)}
                                    sx={{
                                        position: 'absolute',
                                        bottom: '16px',
                                        right: '16px',
                                        color: 'error.main',
                                        '&:hover': {
                                            color: 'error.dark',
                                        },
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Paper>
                        </Grid>
                    }
                </Grid>
                {success && <Alert severity="success" sx={{ mt: 2, textAlign: 'center' }}>{success}</Alert>}
                {error && <Alert severity="error" sx={{ mt: 2, textAlign: 'center' }}>{error}</Alert>}

                <Dialog open={openDialog} onClose={closeDeleteDialog}>
                    <DialogTitle sx={{ fontWeight: 'bold', color: 'error.main' }}>Bist du dir sicher?</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Möchtest du diesen Benutzer wirklich löschen? Dieser Vorgang kann nicht rückgängig gemacht werden.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeDeleteDialog} color="primary">
                            Abbrechen
                        </Button>
                        <Button onClick={handleDeleteAccount} color="error" disabled={deleting}>
                            {deleting ? 'Löschen...' : 'Löschen'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Layout>
    );
};

export default DeleteAccount;
