import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Route } from '../types/route';

const useSocket = () => {
    const [routes, setRoutes] = useState<Route[]>([]);

    useEffect(() => {
        const socket = io('http://localhost:3000/', {
            transports: ['polling'], // Versuche WebSocket als Transport
        });

        socket.on('connect', () => {
            console.log('Verbunden mit Flask-SocketIO!');
        });

        socket.on('route_update', (data) => {
            // Falls `data` bereits eine einzelne Route ist, füge sie direkt dem Array hinzu
            if (data && typeof data === 'object' && !Array.isArray(data)) {
                setRoutes((prevRoutes) => [...prevRoutes, data]);
                console.log('Einzelne Route empfangen:', data);
            } else if (Array.isArray(data)) {
                setRoutes((prevRoutes) => [...prevRoutes, ...data]);
                console.log('Routen-Array aktualisiert:', data);
            } else {
                console.error('Unerwartetes Format:', data);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return routes;
};

export default useSocket;
