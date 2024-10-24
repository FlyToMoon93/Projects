import React, { useState, useEffect } from 'react';
import {Route, Route1} from '../types/route';
import * as XLSX from 'xlsx';
import {
    Button,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    styled,
} from '@mui/material';
import MapChart from './MapChart';

const StyledTableContainer = styled(Box)({
    marginTop: '20px',
    overflowX: 'auto',
});

const StyledTable = styled(Table)({
    width: '100%',
    borderCollapse: 'collapse',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
});

const StyledTableHead = styled(TableHead)({
    backgroundColor: '#f2f2f2',
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    padding: '12px 15px',
    textAlign: 'center',
    borderRight: '1px solid #ddd',
}));

const StyledTableRow = styled(TableRow)({
    '&:nth-of-type(even)': {
        backgroundColor: '#f2f2f2',
    },
    '&:hover': {
        backgroundColor: '#e6f7ff',
        transition: 'background-color 0.3s ease',
    },
});

const AnomalyCell = styled(TableCell)(({ anomaly }: { anomaly: boolean }) => ({
    textAlign: 'center',
    color: anomaly ? '#FF4136' : '#0074D9',
    fontWeight: 'bold',
}));

const FilterButton = styled(Button)(({ active }: { active: boolean }) => ({
    marginLeft: '10px',
    color: active ? 'white' : '#0074D9',
    borderColor: active ? 'transparent' : '#0074D9',
    backgroundColor: active ? '#0074D9' : 'white',
    '&:hover': {
        backgroundColor: '#0074D9',
        color: 'white',
    },
}));

interface BGPRoutesTableProps {
    routes: Route[];
    onFilterChange: (filteredRoutes: Route[]) => void;
}

const BGPRoutesTable: React.FC<BGPRoutesTableProps> = ({ routes, onFilterChange }) => {
    const [anomalyFilter, setAnomalyFilter] = useState<string>('');
    const [selectedRouteData, setSelectedRouteData] = useState<Route1[]>([]); // RouteData anpassen
    const [expandedRow, setExpandedRow] = useState<number | null>(null); // Für die Anzeige des Diagramms

    const handleAnomalyFilterChange = (value: string) => {
        setAnomalyFilter(value);
    };

    const filteredRoutes = anomalyFilter
        ? routes.filter((route) => (anomalyFilter === 'Ja' ? route.anomaly : !route.anomaly))
        : routes;

    useEffect(() => {
        onFilterChange(filteredRoutes);
    }, [filteredRoutes, onFilterChange]);

    const handleRowClick = (index: number, route: Route) => {
      /*  const routeData = [
            {
                prefix: route.prefix,       // If this property should exist in Route, add it here
                next_hop: route.next_hop,     // Add if this property should exist in Route
                timestamp: route.timestamp,    // Add if this property should exist in Route
                anomaly: route.anomaly
            },
        ];*/
// Testdaten für die Karte
        const testData: Route1[] = [
            {
                ip: "45.60.184.35/32",
                city_name: "Redwood City",
                state_name: "California",
                country_name: "United States",
                latitude: 37.48522,
                longitude: -122.23635,
                score: 10.0,
            },
            {
                ip: "192.168.0.1",
                city_name: "Berlin",
                state_name: "Berlin",
                country_name: "Germany",
                latitude: 52.5200,
                longitude: 13.4050,
                score: 8.0,
            },
            {
                ip: "10.0.0.1",
                city_name: "Tokyo",
                state_name: "Tokyo",
                country_name: "Japan",
                latitude: 35.6762,
                longitude: 139.6503,
                score: 9.0,
            },
        ];
        // Toggle der Sichtbarkeit des Diagramms
        if (expandedRow === index) {
            setExpandedRow(null); // Blende das Diagramm aus, wenn dieselbe Zeile erneut geklickt wird
        } else {
            setExpandedRow(index);
            setSelectedRouteData(testData);
        }
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(
            filteredRoutes.map(route => ({
                Präfix: route.prefix,
                'Nächster Hop': route.next_hop,
                'Zeitstempel': route.timestamp,
                Anomalie: route.anomaly ? 'Ja' : 'Nein',
            }))
        );
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'BGP Routes');
        XLSX.writeFile(workbook, 'bgp_routes.xlsx');
    };

    return (
        <>
            <StyledTableContainer>
                <Box display="flex" justifyContent="flex-end" mb={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={exportToExcel}
                    >
                        als Excel-Datei speichern
                    </Button>
                </Box>
                <StyledTable aria-label="BGP Routes Table">
                    <StyledTableHead>
                        <TableRow>
                            <StyledTableCell>Prefix</StyledTableCell>
                            <StyledTableCell>Nächster Hop</StyledTableCell>
                            <StyledTableCell>Zeitstempel</StyledTableCell>
                            <StyledTableCell>
                                <Box display="flex" alignItems="center" justifyContent="center">
                                    <span>Anomalie</span>
                                    <Box display="flex" marginLeft={1}>
                                        <FilterButton
                                            onClick={() => handleAnomalyFilterChange('')}
                                            active={anomalyFilter === ''}
                                        >
                                            Alle
                                        </FilterButton>
                                        <FilterButton
                                            onClick={() => handleAnomalyFilterChange('Ja')}
                                            active={anomalyFilter === 'Ja'}
                                        >
                                            Ja
                                        </FilterButton>
                                        <FilterButton
                                            onClick={() => handleAnomalyFilterChange('Nein')}
                                            active={anomalyFilter === 'Nein'}
                                        >
                                            Nein
                                        </FilterButton>
                                    </Box>
                                </Box>
                            </StyledTableCell>
                        </TableRow>
                    </StyledTableHead>
                    <TableBody>
                        {filteredRoutes.length > 0 ? (
                            filteredRoutes.map((route, index) => (
                                <React.Fragment key={index}>
                                    <StyledTableRow onClick={() => handleRowClick(index, route)}>
                                        <StyledTableCell>{route.prefix}</StyledTableCell>
                                        <StyledTableCell>{route.next_hop}</StyledTableCell>
                                        <StyledTableCell>{route.timestamp}</StyledTableCell>
                                        <AnomalyCell anomaly={route.anomaly}>
                                            {route.anomaly ? 'Ja' : 'Nein'}
                                        </AnomalyCell>
                                    </StyledTableRow>
                                    {/* Bedingte Anzeige des Diagramms innerhalb der Zeile */}
                                    {expandedRow === index && (
                                        <TableRow>
                                            <StyledTableCell colSpan={4} align="center">
                                                <MapChart data={selectedRouteData} />
                                            </StyledTableCell>
                                        </TableRow>
                                    )}
                                </React.Fragment>
                            ))
                        ) : (
                            <TableRow>
                                <StyledTableCell colSpan={4} align="center">
                                    <Typography variant="body2" color="text.secondary">
                                        No routes available
                                    </Typography>
                                </StyledTableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </StyledTable>
            </StyledTableContainer>
        </>
    );
};

export default BGPRoutesTable;
