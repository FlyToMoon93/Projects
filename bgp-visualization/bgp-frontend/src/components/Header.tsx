import React, { FC } from 'react';
import { Typography, Box, Paper, Divider, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

interface HeaderProps {
    totalRoutes: number;
    totalAnomalies: number;
    lastUpdated: string;
    onStop: () => void;   // Function to stop data fetching
    onStart: () => void;  // Function to start data fetching
    isFetching: boolean;  // Boolean to determine the current state
}

const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: '#f2f2f2',
    padding: '20px',
    borderRadius: '0',
    color: '#000',
    textAlign: 'center',
    width: '97%',
}));

const Header: FC<HeaderProps> = ({ totalRoutes, totalAnomalies, lastUpdated, onStop, onStart, isFetching }) => {
    return (
        <StyledPaper elevation={4}>
            <Typography variant="h4" component="h1" sx={{ marginBottom: '10px', color: '#000', fontWeight: 500 }}>
                BGP Routes Visualization
            </Typography>

            <Divider sx={{ backgroundColor: '#000', marginBottom: '10px', width: '100%' }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '10px', width: '100%' }}>
                <Box sx={{ textAlign: 'center', flex: 1 }}>
                    <Typography variant="subtitle1" sx={{ color: '#000' }}>Total Routes</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'black' }}>{totalRoutes}</Typography>
                </Box>

                <Box sx={{ textAlign: 'center', flex: 1 }}>
                    <Typography variant="subtitle1" sx={{ color: '#000' }}>Total Anomalies</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'black' }}>{totalAnomalies}</Typography>
                </Box>
            </Box>

            <Typography variant="body2" sx={{ color: '#000' }}>Last Updated: {lastUpdated}</Typography>

            <Box sx={{ marginTop: '20px' }}>
                {isFetching ? (
                    <Button variant="contained" color="secondary" onClick={onStop}>Stop Fetching Routes</Button>
                ) : (
                    <Button variant="contained" color="primary" onClick={onStart}>Start Fetching Routes</Button>
                )}
            </Box>
        </StyledPaper>
    );
};

export default Header;
