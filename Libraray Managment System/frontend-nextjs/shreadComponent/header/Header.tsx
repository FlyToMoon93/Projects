'use client'
import React, {useState, useRef, useEffect, RefObject} from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Box,
    CssBaseline,
    Avatar,
    Badge,
    Tooltip,
    Collapse,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Button,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LockIcon from '@mui/icons-material/Lock';
import { usePathname, useRouter } from "next/navigation";
import useAuth from "@/components/auth/UseAuth";
import { useOnClickOutside } from 'usehooks-ts'
import ArticleComponent from "@/api/ArticleService";
import UserService from "@/api/UserService";
import Cookies from "js-cookie";

const Header : React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [firstName, setFirstName] = useState<string>("");
    const [role, setRole] = useState<string>("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const router = useRouter();
    const { isAuthenticated, logout } = useAuth();
    const sidebarRef = useRef<HTMLDivElement | null>(null);
    const avatarRef = useRef<HTMLDivElement | null>(null);
    const [showHeader, setShowHeader] = useState(true);
    const { getAllArticles ,updateArticle, deleteArticle} = ArticleComponent();
    const { getProfile} = UserService();

    // Fetch user profile
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = Cookies.get('token');
                if (token) {
                    const response = await getProfile(token);
                    const user = response.user;
                    setFirstName(user.firstname || 'unknown');
                    setRole(user.role || 'unknown');
                }
            } catch (error) {
                console.error('Fehler beim Abrufen des Benutzerprofils:', error);
                setFirstName('unknown');
                setRole('unknown');
            }
        };

        if (isAuthenticated) {
            fetchUserProfile().then(r => console.log(r));
        } else {
            setRole('');
            setFirstName('');
        }

        return () => {
            setFirstName('');
            setRole('');
        };
    }, [isAuthenticated]);

    useOnClickOutside(sidebarRef, () => setIsSidebarOpen(false));

    const handleAvatarClick = () => {
        setIsSidebarOpen(prevState => {
            const newState = !prevState;
            if (newState) {

                    window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            return newState;
        });
    };



    const handleLogout = () => {
        setIsSidebarOpen(false);
        logout();
        router.push('/');
    };

    const pathname = usePathname();

    const handleBackClick = () => {
        if (pathname !== '/') {
            router.back();
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                background: 'radial-gradient(circle at top left, #0f2027, #203a43, #2c5364)',
                overflow: 'hidden',
            }}
        >
            <CssBaseline />

            <AppBar
                position="fixed"
                sx={{
                    background: '#005a9b',
                    zIndex: theme => theme.zIndex.drawer + 1,
                    boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(5px)',
                    transition: 'transform 0.4s ease',
                    transform: showHeader ? 'translateY(0)' : 'translateY(-100%)',
                }}>
                <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {pathname !== '/' && (
                            <Button
                                color="inherit"
                                onClick={handleBackClick}
                                sx={{
                                    color: '#ffeb3b',
                                    textTransform: 'none',
                                    '&:hover': {
                                        backgroundColor: '#781f19',
                                        transform: 'scale(1.05)',
                                    }
                                }}
                            >
                                Zurück
                            </Button>
                        )}
                        <Tooltip
                            title="Cloud & Security"
                            sx={{
                                tooltip: {
                                    backgroundColor: '#781f19',
                                    color: '#781f19',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                }
                            }}
                        >
                            <LockIcon
                                sx={{
                                    color: '#ffeb3b',
                                    fontSize: 40,
                                    ml: 2,
                                    '&:hover': {
                                        color: '#fbc02d',
                                    },
                                    transition: 'color 0.3s ease',
                                }}
                            />
                        </Tooltip>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Tooltip title="Benachrichtigungen">
                            <IconButton
                                color="inherit"
                                sx={{
                                    '&:hover': {
                                        backgroundColor: '#781f19',
                                        transform: 'scale(1.1)',
                                    }
                                }}
                            >
                                <Badge badgeContent={5} color="secondary">
                                    <NotificationsIcon sx={{ color: '#ffeb3b' }} />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={firstName ? `Profil von ${firstName}` : 'Benutzerprofil'}>
                            <Avatar
                                ref={avatarRef}
                                color="inherit"
                                onClick={handleAvatarClick}
                                sx={{
                                    background: '#0f2027',
                                    ml: 2,
                                    color: '#ffeb3b',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s ease, transform 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: '#781f19',
                                        transform: 'scale(1.1)',
                                    },
                                }}
                                aria-label={firstName ? `Benutzer-Avatar für ${firstName}` : 'Benutzer-Avatar'}
                            >
                                {firstName ? firstName.charAt(0).toUpperCase() : ''}
                            </Avatar>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </AppBar>

            <Toolbar />

            <Collapse
                in={isSidebarOpen}
                timeout="auto"
                unmountOnExit
                ref={sidebarRef}
            >
                <Box
                    sx={{
                        backgroundColor: '#005a9b',
                        color: 'white',
                        padding: 2,
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',
                        transition: 'background-color 0.3s ease',
                        '&:hover': {
                            backgroundColor: '#005a9b',
                        }
                    }}
                >
                    <List component="nav">
                        {pathname !== '/' && (
                            <ListItem
                                button
                                onClick={() => { setIsSidebarOpen(false); router.push('/'); }}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: '#781f19',
                                        transform: 'scale(1.02)',
                                    }
                                }}
                            >
                                <ListItemIcon>
                                    <HomeIcon sx={{ color: '#ffeb3b' }} />
                                </ListItemIcon>
                                <ListItemText primary="Startseite" />
                            </ListItem>
                        )}
                        <Divider sx={{ borderColor: '#000' }} />
                        {!isAuthenticated ? (
                            <>
                                <ListItem
                                    button
                                    onClick={() => {
                                        setIsSidebarOpen(false);
                                        router.push('/login');
                                    }}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: '#781f19',
                                            transform: 'scale(1.02)',
                                        }
                                    }}
                                >
                                    <ListItemIcon>
                                        <LoginIcon sx={{ color: '#ffeb3b' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Anmelden" />
                                </ListItem>
                                <ListItem
                                    button
                                    onClick={() => { setIsSidebarOpen(false); router.push('/register'); }}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: '#781f19',
                                            transform: 'scale(1.02)',
                                        }
                                    }}
                                >
                                    <ListItemIcon>
                                        <AppRegistrationIcon sx={{ color: '#ffeb3b' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Konto erstellen" />
                                </ListItem>
                            </>
                        ) : (
                            <>
                                <ListItem
                                    button
                                    onClick={() => { setIsSidebarOpen(false); router.push('/einstellungen'); }}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: '#781f19',
                                            transform: 'scale(1.02)',
                                        }
                                    }}
                                >
                                    <ListItemIcon>
                                        <ManageAccountsIcon sx={{ color: '#ffeb3b' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Mein Konto" />
                                </ListItem>
                                <ListItem
                                    button
                                    onClick={handleLogout}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: '#781f19',
                                            transform: 'scale(1.02)',
                                        }
                                    }}
                                >
                                    <ListItemIcon>
                                        <ExitToAppIcon sx={{ color: '#ffeb3b' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Abmelden" />
                                </ListItem>
                                {role === 'admin' && (
                                    <ListItem
                                        button
                                        onClick={() => { setIsSidebarOpen(false); router.push('/dashboardPage'); }}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: '#781f19',
                                                transform: 'scale(1.02)',
                                            }
                                        }}
                                    >
                                        <ListItemIcon>
                                            <AdminPanelSettingsIcon sx={{ color: '#ffeb3b' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Verwaltung" />
                                    </ListItem>
                                )}
                            </>
                        )}
                    </List>
                </Box>
            </Collapse>

            <Box
                component="main"
                sx={{
                    flex: 1,
                    padding: 3,
                    backgroundColor: '#FAF3E0',
                    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.3)',
                    overflowY: 'auto',
                    transition: 'background-color 0.3s ease',
                    '&:hover': {
                        backgroundColor: '#A8BFC9',
                    }
                }}
            >
                {children}
            </Box>
            <Box >
            </Box>

        </Box>
    );
};

export default Header;
