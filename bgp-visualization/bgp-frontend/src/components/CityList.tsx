import React, { useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import { Route1 } from "../types/route";
import { Card, CardContent, Typography, Container, Grid, TextField, MenuItem, Box, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PublicIcon from '@mui/icons-material/Public';
import { useTheme } from '@mui/material/styles';

interface BGPRoutesTableProps {
    routes: Route1[];
}

const CityList: React.FC<BGPRoutesTableProps> = ({ routes = [] }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [ipSearch, setIpSearch] = useState<string>('');

    const countries = Array.from(new Set(routes.map(route => route?.country_name || "").filter(Boolean)));
    const cities = Array.from(new Set(
        routes
            .filter(route => !selectedCountry || route.country_name === selectedCountry)
            .map(route => route?.city_name || "")
            .filter(Boolean)
    ));

    const filteredRoutes = routes.filter(route =>
        (!selectedCountry || route?.country_name === selectedCountry) &&
        (!selectedCity || route?.city_name === selectedCity) &&
        (!ipSearch || route?.ip?.includes(ipSearch))
    );

    const Row: React.FC<{ index: number; style: React.CSSProperties; data: Route1[] }> = React.memo(({ index, style, data }) => {
        const route = data[index];
        if (!route) return null;

        return (
            <div style={style}>
                <Card variant="outlined" sx={{
                    mb: 2,
                    p: 3,
                    boxShadow: 4,
                    borderRadius: 3,
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.3s',
                    "&:hover": { transform: "scale(1.02)", boxShadow: 8 },
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%', // Fügen Sie diese Zeile hinzu
                }}>
                    <CardContent>
                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                            {route.country_name}
                        </Typography>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Bundesland:</strong> {route.state_name}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Stadt:</strong> {route.city_name}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>IP-Adresse:</strong> {route.ip}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Country Code:</strong> {route.country_code_alpha2}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>
        );
    });

    return (
        <Container maxWidth="md" sx={{ padding: 5, backgroundColor: 'background.paper', borderRadius: 2, boxShadow: 4, overflowX: 'hidden' }}>
            <Box textAlign="center" mb={4}>
                <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
                    <PublicIcon fontSize="large" sx={{ verticalAlign: 'middle', marginRight: 1 }} />
                    Städte und deren Informationen
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Durchsuchen Sie Städteinformationen und finden Sie Details zu Städten weltweit.
                </Typography>
            </Box>

            <Grid container spacing={2} sx={{ marginBottom: 3 }}>
                <Grid item xs={12} sm={4}>
                    <TextField
                        select
                        fullWidth
                        label="Filter nach Land"
                        variant="outlined"
                        value={selectedCountry}
                        onChange={e => {
                            setSelectedCountry(e.target.value);
                            setSelectedCity('');
                        }}
                        sx={{ textTransform: "capitalize", borderColor: 'primary.main' }}
                    >
                        <MenuItem value="">Alle Länder</MenuItem>
                        {countries.map((country) => (
                            <MenuItem key={country} value={country}>
                                {country}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        select
                        fullWidth
                        label="Filter nach Stadt"
                        variant="outlined"
                        value={selectedCity}
                        onChange={e => {
                            setSelectedCity(e.target.value);
                            const countryForCity = routes.find(route => route.city_name === e.target.value)?.country_name || '';
                            setSelectedCountry(countryForCity);
                        }}
                    >
                        <MenuItem value="">Alle Städte</MenuItem>
                        {cities.map((city) => (
                            <MenuItem key={city} value={city}>
                                {city}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        label="Suche nach IP-Adresse"
                        variant="outlined"
                        value={ipSearch}
                        onChange={e => setIpSearch(e.target.value)}
                        InputProps={{
                            startAdornment: <SearchIcon color="disabled" sx={{ marginRight: 1 }} />
                        }}
                    />
                </Grid>
            </Grid>

            {filteredRoutes.length > 0 ? (
                <Box sx={{ overflow: 'hidden', position: 'relative' }}>
                    <List
                        height={isSmallScreen ? 400 : 600}
                        itemCount={filteredRoutes.length}
                        itemSize={isSmallScreen ? 180 : 160}
                        width="100%"
                        itemData={filteredRoutes}
                    >
                        {({ index, style, data }) => <Row index={index} style={style} data={data} />}
                    </List>
                </Box>
            ) : (
                <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', marginTop: 4 }}>
                    Keine Städte gefunden. Versuchen Sie, Ihre Filter zu ändern.
                </Typography>
            )}
        </Container>
    );
};

export default CityList;
