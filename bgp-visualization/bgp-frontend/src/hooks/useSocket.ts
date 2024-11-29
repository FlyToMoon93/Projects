import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Route1} from '../types/route';

const useSocket = () => {
    const [routes, setRoutes] = useState<Route1[]>([]);

    useEffect(() => {
        const socket = io('http://localhost:3000/', {
            transports: ['websocket'],
        });

        socket.on('connect', () => {
            console.log('Verbunden mit Flask-SocketIO!');
        });

        // 'all_routes' Event empfangen, um die gesamte Routenliste auf einmal zu bekommen
        socket.on('all_routes', (data) => {
            if (Array.isArray(data.ipmap)) {
                setRoutes(data.ipmap); // Setzt die gesamte Routenliste auf einmal
                console.log('Alle Routen empfangen:', data.ipmap);
            } else {
                console.error('Unerwartetes Format:', data);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return { routes };
};

export default useSocket;
