import React, { useEffect, useState } from 'react';
import { Box, Paper } from '@mui/material';
import Plot from 'react-plotly.js';
import { Data, Layout } from 'plotly.js';
import { Route1 } from "../types/route";

interface MapChartProps {
    data: Route1[];
}

const MapChart: React.FC<MapChartProps> = ({ data }) => {
    const [zoom, setZoom] = useState(1.5);
    const [selectedPoints, setSelectedPoints] = useState<number[]>([]);

    useEffect(() => {
        console.log("Daten für Routenpunkte:", data);
    }, [data]);

    const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (event.deltaY < 0) {
            setZoom((prev) => Math.min(prev + 0.1, 5)); // Maximaler Zoom
        } else {
            setZoom((prev) => Math.max(prev - 0.1, 0.5)); // Minimaler Zoom
        }
    };

    const plotData: Data[] = [
        {
            type: 'scattermapbox',
            lon: data.map(route => route.longitude),
            lat: data.map(route => route.latitude),
            text: data.map(route => `${route.city_name}, ${route.country_name}`),
            marker: {
                size: data.map((route, index) =>
                    selectedPoints.includes(index) ? route.score * 3 : route.score * 2
                ),
                color: 'rgb(255, 0, 0)',
                opacity: 0.7,
            },
        },
    ];

    const layout: Partial<Layout> = {
        mapbox: {
            style: 'open-street-map', // Verwende den Standardstil von OpenStreetMap
            center: { lat: 37.48522, lon: -122.23635 },
            zoom: zoom,
            pitch: 0,
            bearing: 0,
        },
        margin: { t: 0, l: 0, r: 0, b: 0 },
        autosize: true,
    };

    const handleClick = (event: any) => {
        const pointIndex = event.points[0].pointIndex;
        setSelectedPoints(prev =>
            prev.includes(pointIndex)
                ? prev.filter(index => index !== pointIndex)
                : [...prev, pointIndex]
        );
    };

    return (
        <Box
            sx={{ width: '100%', height: '60vh', position: 'relative', overflow: 'hidden' }}
            onWheel={handleWheel}
        >
            <Paper elevation={3} sx={{ width: '100%', height: '100%' }}>
                <Plot
                    data={plotData}
                    layout={layout}
                    style={{ width: '100%', height: '100%' }}
                    config={{
                        displayModeBar: true,
                        responsive: true,
                    }}
                    onClick={handleClick} // Ereignisbehandler hier hinzufügen
                />
            </Paper>
        </Box>
    );
};

export default MapChart;
