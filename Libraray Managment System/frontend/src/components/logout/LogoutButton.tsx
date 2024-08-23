// components/LogoutButton.tsx
import React from 'react';
import { Button, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import useAuth from '@/app/useAuth/useAuth'; // Importiere den Hook

const LogoutButton: React.FC = () => {
    const { logout } = useAuth(); // Verwende den Hook für die Logout-Funktion

    return (
        <ListItem button onClick={logout}>
            <ListItemIcon>
                <ExitToAppIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Abmelden" />
        </ListItem>
    );
};

export default LogoutButton;
