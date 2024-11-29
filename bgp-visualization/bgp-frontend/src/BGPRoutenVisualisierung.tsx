import React, { useEffect, useState } from 'react';
import useSocket from './hooks/useSocket';  // Hook für die Socket-Verbindung
import BGPRoutesContainer from "./components/BGPRoutesContainer";
import Header from "./components/Header";
import {Route, Route1} from "./types/route";
import CityList from "./components/CityList";
import {index} from "d3";

const BGPRoutenVisualisierung: React.FC = () => {
    const [routes, setRoutes] = useState<Route[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    const socketRoute = useSocket();  // Hole die Routen vom Backend per Socket
    const recentAnomalies = routes.filter(route => route.anomaly).slice(0, 5);
    const [routes1, setRoutes1] = useState<Route1[]>([]);

    const socketRoutes = [
        { prefix: '1.1.0.0/24', next_hop: '172.17.179.104', timestamp: '2024-10-19 15:41:06', anomaly: false },
        { prefix: '1.1.0.0/25', next_hop: '172.17.179.104', timestamp: '2024-10-19 15:41:06', anomaly: false },
        { prefix: '173.209.104.0/21', next_hop: '80.81.192.172', timestamp: '2024-10-19 15:41:06', anomaly: true },
        { prefix: '2402:ab00::/32', next_hop: '2001:7f8::950e:0:1', timestamp: '2024-10-19 15:41:06', anomaly: false },
        { prefix: '2a10:c5c1:bdae::/48', next_hop: '2001:7f8::7156:0:1', timestamp: '2024-10-19 15:41:06', anomaly: false },
        { prefix: '185.190.148.0/23', next_hop: '80.81.194.174', timestamp: '2024-10-19 15:41:06', anomaly: false },
        { prefix: '185.190.150.0/24', next_hop: '80.81.194.174', timestamp: '2024-10-19 15:41:06', anomaly: false },
        { prefix: '2001:43f8:d60::/48', next_hop: '2001:7f8::1b1b:0:1', timestamp: '2024-10-19 15:41:06', anomaly: true }
    ];

    useEffect(() => {
        if (isFetching && socketRoute.routes.length > 0) {
            // Setze die Routen aus dem Socket in den State
            setRoutes(socketRoutes);
            setRoutes1(socketRoute.routes)
        }
    }, [socketRoutes, isFetching]);

    const handleStopFetching = () => setIsFetching(false);
    const handleStartFetching = () => setIsFetching(true);

    const totalRoutes = routes.length;
    const totalAnomalies = routes.filter(route => route.anomaly).length;
    const lastUpdated = new Date().toLocaleString();
// Funktion zum Abrufen von Anomalien basierend auf einem Zeitrahmen
    const handleFetchAnomalies = (timeRange: string) => {
        // Logik zum Abrufen der Anomalien
        console.log(`Fetching anomalies for time range: ${timeRange}`);
    };
    return (
        <div>
            <Header
                totalRoutes={totalRoutes}
                totalAnomalies={totalAnomalies}
                lastUpdated={lastUpdated}
                onStop={handleStopFetching}
                onStart={handleStartFetching}
                isFetching={isFetching}
                recentAnomalies={recentAnomalies} // Die neue Prop hinzufügen
                onFetchAnomalies={handleFetchAnomalies} // Die neue Funktion hinzufügen
                affectedCountries={routes1.map(value => value.country_name)} // Beispiel für betroffene Länder


            />
            <BGPRoutesContainer routes={routes} />
            <CityList routes={routes1}/>

        </div>
    );
};

export default BGPRoutenVisualisierung;
