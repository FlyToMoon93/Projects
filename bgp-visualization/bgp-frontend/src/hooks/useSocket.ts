import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Route } from '../types/route';

const useSocket = () => {
    const [routes, setRoutes] = useState<Route[]>([]);

    useEffect(() => {
        const socket = io('https://frontend.univ.leitwert.net/', {
            transports: ['polling']
        });

        socket.on('connect', () => {
            console.log('Verbunden mit Flask-SocketIO!');
        });

        socket.on('route_update', (route: Route) => {
            setRoutes((prevRoutes) => [...prevRoutes, route]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return routes;
};

export default useSocket;
