import React, { useEffect } from 'react';
import Plotly from 'plotly.js-dist-min';
import { Route } from '../types/route';
import '../styles/PlotlyVisualization.css';

interface PlotlyVisualizationProps {
    routes: Route[];
}

const PlotlyVisualization: React.FC<PlotlyVisualizationProps> = ({ routes }) => {
    useEffect(() => {
        const initPlot = () => {
            // Initialisiere die Daten mit den vorhandenen Routen
            const initialX = routes.map(route => route.timestamp);
            const initialY = routes.map(route => route.prefix);
            const initialColors = routes.map(route => (route.anomaly ? '#FF4136' : '#0074D9'));
            const initialSizes = Array(routes.length).fill(12); // Initiale Größen für Marker

            const data = [{
                x: initialX,
                y: initialY,
                mode: 'markers+text',
                marker: { size: initialSizes, color: initialColors },
                text: initialY, // Optional: die Präfixe als Text anzeigen
                textposition: 'top center',
                hoverinfo: 'text',
            }];

            const layout: Partial<Plotly.Layout> = {
                title: {
                    text: 'Live Routen-Updates',
                    font: { size: 24, color: '#333' },
                },
                xaxis: { title: 'Zeit', type: 'category' },
                yaxis: { title: 'Präfix', automargin: true },
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
            const color = latestRoute.anomaly ? '#FF4136' : '#0074D9';

            // Debugging-Logs
            console.log('Latest Route:', latestRoute);
            console.log('Länge der Routen:', routes.length);
            console.log('X Value:', [latestRoute.timestamp]);
            console.log('Y Value:', [latestRoute.prefix]);
            console.log('Color Value:', [color]);

            // Neue Werte in das Diagramm einfügen
            Plotly.extendTraces('plot', {
                x: [[latestRoute.timestamp]], // Ein Array mit einem Wert
                y: [[latestRoute.prefix]],     // Ein Array mit einem Wert
                'marker.color': [[color]] // Ein Array mit einer Farbe, korrigiert
            }, [0])}
    }, [routes]);

    return (
        <div className="data" id="plot">
            {routes.length === 0 && <p>Daten werden geladen...</p>}
        </div>
    );
};

export default PlotlyVisualization;
