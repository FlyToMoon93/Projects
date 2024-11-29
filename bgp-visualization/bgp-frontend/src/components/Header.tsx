import React, { FC, useState } from 'react';
import {
    Typography,
    Box,
    Paper,
    Divider,
    Button,
    Tooltip,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Popover,
} from '@mui/material';
import { FixedSizeList as List } from 'react-window';
import { styled } from '@mui/material/styles';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import RouteIcon from '@mui/icons-material/AltRoute';
import ErrorIcon from '@mui/icons-material/Error';
import TimerIcon from '@mui/icons-material/AccessTime';
import PublicIcon from '@mui/icons-material/Public';
import { Route } from "../types/route";
import { SelectChangeEvent } from '@mui/material';

interface HeaderProps {
    totalRoutes: number;
    totalAnomalies: number;
    recentAnomalies: Route[];
    lastUpdated: string;
    onStop: () => void;
    onStart: () => void;
    isFetching: boolean;
    onFetchAnomalies: (timeFrame: string) => void;
    affectedCountries: string[]; // Neue Prop für betroffene Länder
}
// Größe des Eintrags in der Liste
const ITEM_SIZE = 35;

const CountryItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    background: theme.palette.background.default,
    borderRadius: '8px',
    padding: '8px 12px',
    marginBottom: '8px', // Abstand zwischen den Ländern
    transition: 'background-color 0.3s ease',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
    background: '#f2f2f2',
    padding: '20px',
    borderRadius: '20px',
    textAlign: 'center',
    color: '#333',
    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
}));

const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#3f51b5',
}));

const StyledSelect = styled(Select)(({ theme }) => ({
    borderRadius: '5px',
    '& .MuiSelect-select': {
        padding: '5px',
    },
}));

const Header: FC<HeaderProps> = ({
                                     totalRoutes,
                                     totalAnomalies,
                                     recentAnomalies,
                                     lastUpdated,
                                     onStop,
                                     onStart,
                                     isFetching,
                                     onFetchAnomalies,
                                     affectedCountries, // Betroffene Länder von den Props empfangen
                                 }) => {
    const [selectedTimeFrame, setSelectedTimeFrame] = useState<string>('1 Stunde');
    const [lastTimeFrame, setLastTimeFrame] = useState<string>('1 Stunde');
    // Zusätzliche `anchorEl`-Zustände für jedes Popover
    const [anchorElCountries, setAnchorElCountries] = useState<null | HTMLElement>(null);
    const [anchorElTimeFrame, setAnchorElTimeFrame] = useState<null | HTMLElement>(null);
    // Filtere doppelte Einträge in der affectedCountries-Liste
    const uniqueAffectedCountries = Array.from(new Set(affectedCountries));

// Funktionen zum Öffnen der jeweiligen Popover
    const handlePopoverOpenCountries = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElCountries(event.currentTarget);
    };

    const handlePopoverOpenTimeFrame = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElTimeFrame(event.currentTarget);
    };

// Funktionen zum Schließen der jeweiligen Popover
    const handlePopoverCloseCountries = () => {
        setAnchorElCountries(null);
    };

    const handlePopoverCloseTimeFrame = () => {
        setAnchorElTimeFrame(null);
    };

// Zustände, um zu prüfen, ob die Popovers offen sind
    const openCountries = Boolean(anchorElCountries);
    const openTimeFrame = Boolean(anchorElTimeFrame);


    const handleFetchAnomalies = () => {
        onFetchAnomalies(selectedTimeFrame);
        setLastTimeFrame(selectedTimeFrame);
        handlePopoverCloseTimeFrame();        // Popover schließen
    };

    const handleChange = (event: SelectChangeEvent<unknown>) => {
        const value = event.target.value as string;
        setSelectedTimeFrame(value);
    };

    const renderCountry = ({ index, style }: { index: number; style: React.CSSProperties }) => (
        <div style={style}>
            <CountryItem>
                <PublicIcon sx={{ fontSize: 20, color: '#3f51b5', marginRight: 1 }} />
                <Typography variant="body2">{uniqueAffectedCountries[index]}</Typography>
            </CountryItem>
        </div>
    );
    return (
        <StyledPaper elevation={4}>
            <Typography variant="h4" component="h1" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
                BGP Routes Visualization
            </Typography>

            <Divider sx={{ backgroundColor: '#666', marginBottom: '20px', width: '100%' }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
                <Tooltip title="Gesamtanzahl der aktiven Routen">
                    <Box sx={{ textAlign: 'center', cursor: 'pointer', position: 'relative' }}>
                        <RouteIcon sx={{ fontSize: 40, color: '#3f51b5' }} />
                        <Typography variant="subtitle1" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                            Gesamte Routen
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 600, color: '#3f51b5' }}>{totalRoutes}</Typography>
                    </Box>
                </Tooltip>

                <Tooltip title="Gesamtanzahl der erkannten Anomalien">
                    <Box sx={{ textAlign: 'center', cursor: 'pointer', position: 'relative' }}>
                        <ErrorIcon sx={{ fontSize: 40, color: '#f44336' }} />
                        <Typography variant="subtitle1" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                            Gesamte Anomalien
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 600, color: '#f44336' }}>{totalAnomalies}</Typography>
                    </Box>
                </Tooltip>

                <Tooltip title={`Letzte ${lastTimeFrame.toLowerCase().replace('s', 'S').replace('m', 'M')} erkannte Anomalien`}>
                    <Box sx={{ textAlign: 'center', cursor: 'pointer', position: 'relative' }}>
                        <TimerIcon
                            sx={{
                                fontSize: 40,
                                color: '#191970',
                                marginTop: '-2px',
                            }}
                        />
                        <Typography variant="subtitle1" sx={{ fontSize: '0.5rem', color: '#191970', fontWeight: 'bold', lineHeight: '1.2', marginTop: 0 }}>
                            Letzte {lastTimeFrame.toLowerCase().replace('s', 'S').replace('m', 'M')}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontSize: '1rem', fontWeight: 'bold', lineHeight: '1.2', marginTop: 0 }}>
                            Anomalien
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 600, color: '#f44336' }}>
                            {recentAnomalies.length}
                        </Typography>
                    </Box>
                </Tooltip>

                <Tooltip title="Betroffene Länder anzeigen">
                    <Box
                        sx={{ textAlign: 'center', cursor: 'pointer' }}
                        onClick={handlePopoverOpenCountries} // Verwende hier die neue Funktion
                    >
                        <PublicIcon sx={{ fontSize: 40, color: '#3f51b5' }} />
                        <Typography variant="subtitle1" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                            Betroffene Länder
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 600, color: '#f44336' }}>
                            {uniqueAffectedCountries.length}
                        </Typography>
                    </Box>
                </Tooltip>

                <Popover
                    open={openCountries} // Verwende hier den neuen Zustand
                    anchorEl={anchorElCountries} // Verwende hier die neue Variable
                    onClose={handlePopoverCloseCountries} // Verwende hier die neue Schließfunktion
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Box sx={{ padding: 2, width: '300px' }}>
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>
                            Betroffene Länder:
                        </Typography>
                        <List
                            height={200} // Höhe des sichtbaren Bereichs
                            itemCount={uniqueAffectedCountries.length}
                            itemSize={ITEM_SIZE}
                            width="100%"
                        >
                            {renderCountry}
                        </List>
                    </Box>
                </Popover>

            </Box>


            <Tooltip title="Details zur letzten Aktualisierung">
                <Typography variant="body2" sx={{ color: '#555', marginTop: '10px' }}>
                    Last Updated: {lastUpdated}
                </Typography>
            </Tooltip>

            <Box sx={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                {isFetching ? (
                    <Button variant="contained" color="secondary" startIcon={<StopIcon />} onClick={onStop}>
                        Stop Fetching
                    </Button>
                ) : (
                    <Button variant="contained" color="primary" startIcon={<PlayArrowIcon />} onClick={onStart}>
                        Start Fetching
                    </Button>
                )}

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handlePopoverOpenTimeFrame} // Verwende hier die neue Funktion
                    sx={{ minWidth: '150px' }}
                >
                    Zeitrahmen auswählen
                </Button>

                <Popover
                    open={openTimeFrame} // Verwende hier den neuen Zustand
                    anchorEl={anchorElTimeFrame} // Verwende hier die neue Variable
                    onClose={handlePopoverCloseTimeFrame} // Verwende hier die neue Schließfunktion
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'left',
                    }}
                    sx={{
                        '& .MuiPaper-root': {
                            width: '250px',
                            padding: 2,
                        },
                    }}
                >
                    <StyledInputLabel id="time-frame-select-label">Letzte Anomalien</StyledInputLabel>
                    <FormControl fullWidth>
                        <StyledSelect
                            labelId="time-frame-select-label"
                            value={selectedTimeFrame}
                            onChange={handleChange}
                        >
                            <MenuItem value="15 Minuten">Letzte 15 Minuten</MenuItem>
                            <MenuItem value="30 Minuten">Letzte 30 Minuten</MenuItem>
                            <MenuItem value="45 Minuten">Letzte 45 Minuten</MenuItem>
                            <MenuItem value="1 Stunde">Letzte 1 Stunde</MenuItem>
                        </StyledSelect>
                    </FormControl>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleFetchAnomalies}
                        sx={{
                            marginTop: 1,
                            borderRadius: '5px',
                            '&:hover': {
                                backgroundColor: '#1976d2',
                                transform: 'scale(1.05)',
                            },
                            transition: 'background-color 0.3s, transform 0.3s'
                        }}
                    >
                        Anomalien Abrufen
                    </Button>
                </Popover>

            </Box>
        </StyledPaper>
    );
};

export default Header;
