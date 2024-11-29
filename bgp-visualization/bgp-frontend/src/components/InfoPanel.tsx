import React, { useState } from 'react';
import { Typography, Box, Paper, Divider, Avatar, Accordion, AccordionSummary, AccordionDetails, Grid } from '@mui/material';
import { Flag, Info, ExpandMore } from '@mui/icons-material';
import {Route1} from '../types/route';

interface InfoPanelProps {
    data: Route1[];
}

const InfoPanel: React.FC<InfoPanelProps> = ({ data }) => {
    const affectedCountries = Array.from(new Set(data.map(route => route.country_name)));
    const [expandedCountries, setExpandedCountries] = useState(false);
    const [expandedInfo, setExpandedInfo] = useState(false);

    const handleCountriesChange = () => {
        setExpandedCountries(prev => !prev);
    };

    const handleInfoChange = () => {
        setExpandedInfo(prev => !prev);
    };

    return (
        <Paper
            elevation={10}
            sx={{
                padding: 3,
                borderRadius: '16px',
                background: '#f2f2f2',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            }}
        >
            {/* Affected Countries Accordion */}
            <Accordion expanded={expandedCountries} onChange={handleCountriesChange} sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMore />} aria-controls="countries-content" id="countries-header">
                    <Box display="flex" alignItems="center">
                        <Avatar sx={{ bgcolor: '#4caf50', mr: 1 }}>
                            <Flag />
                        </Avatar>
                        <Typography variant="h5" fontWeight="bold" color="text.primary">
                            Betroffene Länder
                        </Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        {affectedCountries.length > 0 ? (
                            affectedCountries.map((country, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Paper
                                        elevation={3}
                                        sx={{
                                            padding: 2,
                                            borderRadius: '8px',
                                            backgroundColor: '#e1f5fe',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <Typography variant="body1" color="text.primary">
                                            {country}
                                        </Typography>
                                    </Paper>
                                </Grid>
                            ))
                        ) : (
                            <Typography variant="body2" sx={{ color: '#666' }}>
                                Keine betroffenen Länder
                            </Typography>
                        )}
                    </Grid>
                </AccordionDetails>
            </Accordion>

            <Divider sx={{ mb: 2 }} />

            {/* Additional Information Accordion */}
            <Accordion expanded={expandedInfo} onChange={handleInfoChange}>
                <AccordionSummary expandIcon={<ExpandMore />} aria-controls="info-content" id="info-header">
                    <Box display="flex" alignItems="center">
                        <Avatar sx={{ bgcolor: '#2196f3', mr: 1 }}>
                            <Info />
                        </Avatar>
                        <Typography variant="h5" fontWeight="bold" color="text.primary">
                            Zusätzliche Informationen
                        </Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        {data.length > 0 && (
                            data.map((route, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Paper
                                        elevation={3}
                                        sx={{
                                            padding: 2,
                                            borderRadius: '8px',
                                            backgroundColor: '#e1f5fe',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <Typography variant="body2" color="text.primary">
                                            <strong>Prefix:</strong> {route.ip}
                                        </Typography>
                                        <Typography variant="body2" color="text.primary">
                                            <strong>Stadt:</strong> {route.city_name}
                                        </Typography>
                                        <Typography variant="body2" color="text.primary">
                                            <strong>Bundesstaat:</strong> {route.state_name}
                                        </Typography>
                                        <Typography variant="body2" color="text.primary">
                                            <strong>Koordinaten:</strong> {route.latitude}, {route.longitude}
                                        </Typography>
                                        <Typography variant="body2" color="text.primary">
                                            <strong>Score:</strong> {route.score}
                                        </Typography>
                                    </Paper>
                                </Grid>
                            ))
                        )}
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </Paper>
    );
};

export default InfoPanel;
