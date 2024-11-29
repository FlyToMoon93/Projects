import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';
import { Route } from '../types/route';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface PlotlyVisualizationProps {
    routes: Route[];
}

const PlotContainer = styled(Box)(({ theme }) => ({
    height: '560px',
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
    height: '100%',
    width: '100%',
    fontSize: '24px',
});

const PlotlyVisualization: React.FC<PlotlyVisualizationProps> = ({ routes }) => {
    const plotRef = useRef<HTMLDivElement | null>(null);

    const initPlot = () => {
        if (!plotRef.current) return;

        const initialX: string[] = routes.map(route => route.timestamp);
        const initialY: string[] = routes.map(route => route.prefix);
        const initialColors: string[] = routes.map(route => (route.anomaly ? '#FF4136' : '#0074D9'));
        const initialSizes: number[] = Array(routes.length).fill(12);

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
            paper_bgcolor: '#ffffff',
            plot_bgcolor: '#ffffff',
            font: { color: '#333' },
        };

        const config: Partial<Plotly.Config> = {
            responsive: true,
            toImageButtonOptions: {
                format: 'png',
                filename: 'bgp-routes',
            },
        };

        Plotly.newPlot(plotRef.current, data, layout, config)
    };

    const handleResize = () => {
        if (plotRef.current) {
            Plotly.Plots.resize(plotRef.current);
        }
    };

    useEffect(() => {
        initPlot();

        const resizeObserver = new ResizeObserver(handleResize);
        if (plotRef.current) {
            resizeObserver.observe(plotRef.current);
        }

        return () => {
            if (plotRef.current) {
                resizeObserver.unobserve(plotRef.current);
            }
        };
    }, [routes]);

    useEffect(() => {
        if (routes.length > 0 && plotRef.current) {
            const latestRoute = routes[routes.length - 1];
            const color = latestRoute.anomaly ? '#FF4136' : '#006400';

            Plotly.extendTraces(plotRef.current, {
                x: [[latestRoute.timestamp]],
                y: [[latestRoute.prefix]],
                'marker.color': [[color]],
            }, [0])
        }
    }, [routes]);

    return (
        <PlotContainer>
            <DataContainer ref={plotRef} />
        </PlotContainer>
    );
};

export default PlotlyVisualization;
