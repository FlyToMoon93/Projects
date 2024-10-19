import React from 'react';
import { Route } from '../types/route';
import '../styles/BGPRoutesTable.css';

interface BGPRoutesTableProps {
    routes: Route[];
}

const BGPRoutesTable: React.FC<BGPRoutesTableProps> = ({ routes }) => {
    return (
        <div className="table-container">
            <table className="styled-table">
                <thead>
                <tr>
                    <td>Präfix</td>
                    <td>Nächster Hop</td>
                    <td>Zeitstempel</td>
                    <td>Anomalie</td>
                </tr>
                </thead>
                <tbody>
                {routes.map((route, index) => (
                    <tr key={index}>
                        <td data-label="Präfix">{route.prefix}</td>
                        <td data-label="Nächster Hop">{route.next_hop}</td>
                        <td data-label="Zeitstempel">{route.timestamp}</td>
                        <td data-label="Anomalie" className={route.anomaly ? 'anomaly-yes' : 'anomaly-no'}>
                            {route.anomaly ? 'Ja' : 'Nein'}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default BGPRoutesTable;
