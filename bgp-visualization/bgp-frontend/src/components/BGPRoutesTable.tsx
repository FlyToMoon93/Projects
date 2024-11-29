import React, { useState, useEffect } from 'react';
import { Route, Route1 } from '../types/route';
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
    IconButton,
    Collapse,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import InfoPanel from "./InfoPanel";

const StyledTableContainer = styled(Box)(({ theme }) => ({
    marginTop: '20px',
    overflowX: 'auto',
}));

const StyledTable = styled(Table)(({ theme }) => ({
    width: '100%',
    borderCollapse: 'collapse',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
    backgroundColor: theme.palette.grey[200],
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    padding: '12px 15px',
    textAlign: 'center',
    borderRight: '1px solid #ddd',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:hover': {
        backgroundColor: theme.palette.action.selected,
        transition: 'background-color 0.3s ease',
    },
}));

const AnomalyCell = styled(TableCell)(({ anomaly }: { anomaly: boolean }) => ({
    textAlign: 'center',
    color: anomaly ? '#FF4136' : '#0074D9',
    fontWeight: 'bold',
    position: 'relative', // für das Pfeilsymbol
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
    const [selectedRouteData, setSelectedRouteData] = useState<Route1[]>([]);
    const [expandedRow, setExpandedRow] = useState<number | null>(null);

    const handleAnomalyFilterChange = (value: string) => {
        setAnomalyFilter(value);
        setExpandedRow(null);
    };

    const filteredRoutes = anomalyFilter
        ? routes.filter((route) => (anomalyFilter === 'Ja' ? route.anomaly : !route.anomaly))
        : routes;

    useEffect(() => {
        onFilterChange(filteredRoutes);
    }, [filteredRoutes, onFilterChange]);

    const handleRowClick = (index: number, route: Route) => {
        if (!route.anomaly) return;

        const testData: Route1[] = [
            {
                ip: route.prefix,
                city_name: "Redwood City",
                state_name: "California",
                country_name: "United States",
                latitude: 37.48522,
                longitude: -122.23635,
                score: 10.0,
                country_code_alpha2:""
            },
            {
                ip: route.prefix,
                city_name: "Berlin",
                state_name: "Berlin",
                country_name: "Germany",
                latitude: 52.5200,
                longitude: 13.4050,
                score: 8.0,
                country_code_alpha2:""
            },
            {
                ip: route.prefix,
                city_name: "Tokyo",
                state_name: "Tokyo",
                country_name: "Japan",
                latitude: 35.6762,
                longitude: 139.6503,
                score: 9.0,
                country_code_alpha2:""
            },
        ];

        if (expandedRow === index) {
            setExpandedRow(null);
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
                                    <StyledTableRow
                                        onClick={() => handleRowClick(index, route)}
                                        style={{ cursor: route.anomaly ? 'pointer' : 'default' }}
                                    >
                                        <StyledTableCell>{route.prefix}</StyledTableCell>
                                        <StyledTableCell>{route.next_hop}</StyledTableCell>
                                        <StyledTableCell>{route.timestamp}</StyledTableCell>
                                        <AnomalyCell anomaly={route.anomaly}>
                                            <Box display="flex" justifyContent="center" alignItems="center" width="100%">
                                                <Typography variant="body2" align="center" sx={{ marginRight: '4px' }}>
                                                    {route.anomaly ? 'Ja' : 'Nein'}
                                                </Typography>
                                                {route.anomaly && expandedRow === index && (
                                                    <IconButton size="small" style={{ padding: 0, position: 'absolute', right: 0 }}>
                                                        <ExpandLess />
                                                    </IconButton>
                                                )}
                                                {route.anomaly && expandedRow !== index && (
                                                    <IconButton size="small" style={{ padding: 0, position: 'absolute', right: 0 }}>
                                                        <ExpandMore />
                                                    </IconButton>
                                                )}
                                            </Box>
                                        </AnomalyCell>
                                    </StyledTableRow>
                                    <TableRow>
                                        <TableCell colSpan={4} align="center" style={{ padding: 0 }}>
                                            <Collapse in={expandedRow === index} timeout="auto" unmountOnExit>
                                                <InfoPanel data={selectedRouteData} />
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            ))
                        ) : (
                            <TableRow>
                                <StyledTableCell colSpan={4} align="center">
                                    <Typography variant="body2" color="text.secondary">
                                        Keine Routen verfügbar
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
