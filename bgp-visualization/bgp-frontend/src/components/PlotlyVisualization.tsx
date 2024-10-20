import React, { useEffect } from 'react';
import Plotly from 'plotly.js-dist-min';
import { Route } from '../types/route';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface PlotlyVisualizationProps {
    routes: Route[];
}

const PlotContainer = styled(Box)(({ theme }) => ({
    height: '600px',
    marginBottom: '40px',
    width: '100%',
    border: '2px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    [theme.breakpoints.down('sm')]: {
        height: '300px',
    },
}));

const DataContainer = styled('div')({
    textAlign: 'center',
    color: 'red',
    height: '560px',
    fontSize: '24px',
});


const PlotlyVisualization: React.FC<PlotlyVisualizationProps> = ({ routes }) => {
    useEffect(() => {
        const initPlot = () => {
            const initialX: string[] = routes.map(route => route.timestamp);
            const initialY: string[] = routes.map(route => route.prefix);
            const initialColors: string[] = routes.map(route => (route.anomaly ? '#FF4136' : '#0074D9'));
            const initialSizes: number[] = Array(routes.length).fill(12); // Initial sizes for markers

            const data = [{
                x: initialX,
                y: initialY,
                mode: 'markers+text' as const,
                marker: { size: initialSizes, color: initialColors },
                text: initialY,
                textposition: 'top center' as const,
                hoverinfo: 'text' as const,
            }];

            const layout: Partial<Plotly.Layout> = {
                title: {
                    text: 'Live Route Updates',
                    font: { size: 24, color: '#333' },
                },
                xaxis: { title: 'Time', type: 'category', automargin: true },
                yaxis: { title: '', automargin: true },
                paper_bgcolor: 'transparent',
                plot_bgcolor: 'transparent',
                font: { color: '#333' },
            };

            Plotly.newPlot('plot', data, layout);
        };

        initPlot();
    }, [routes]);

    useEffect(() => {
        if (routes.length > 0) {
            const latestRoute = routes[routes.length - 1];
            const color = latestRoute.anomaly ? '#FF4136' : '#006400';

            // Add new values to the chart
            Plotly.extendTraces('plot', {
                x: [[latestRoute.timestamp]], // Array with one value
                y: [[latestRoute.prefix]],     // Array with one value
                'marker.color': [[color]]      // Array with one color
            }, [0]);
        }
    }, [routes]);

    return (
        <PlotContainer>
            <DataContainer id="plot" />
        </PlotContainer>
    );
};

export default PlotlyVisualization;
