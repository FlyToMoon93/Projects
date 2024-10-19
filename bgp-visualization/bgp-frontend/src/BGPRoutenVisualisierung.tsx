import React from 'react';
import useSocket from './hooks/useSocket';
import PlotlyVisualization from './components/PlotlyVisualization';
import BGPRoutesTable from './components/BGPRoutesTable';
import Header from "./components/Header";

const BGPRoutenVisualisierung: React.FC = () => {
   const routes = useSocket();
  /*  const routes = [
        { prefix: '1.1.0.0/24', next_hop: '172.17.179.104', timestamp: '2024-10-19 15:41:06', anomaly: false },
        { prefix: '1.1.0.0/25', next_hop: '172.17.179.104', timestamp: '2024-10-19 15:41:06', anomaly: false },
        { prefix: '173.209.104.0/21', next_hop: '80.81.192.172', timestamp: '2024-10-19 15:41:06', anomaly: true },
        { prefix: '2402:ab00::/32', next_hop: '2001:7f8::950e:0:1', timestamp: '2024-10-19 15:41:06', anomaly: false },
        { prefix: '2a10:c5c1:bdae::/48', next_hop: '2001:7f8::7156:0:1', timestamp: '2024-10-19 15:41:06', anomaly: false },
        { prefix: '185.190.148.0/23', next_hop: '80.81.194.174', timestamp: '2024-10-19 15:41:06', anomaly: false },
        { prefix: '185.190.150.0/24', next_hop: '80.81.194.174', timestamp: '2024-10-19 15:41:06', anomaly: false },
        { prefix: '2001:43f8:d60::/48', next_hop: '2001:7f8::1b1b:0:1', timestamp: '2024-10-19 15:41:06', anomaly: true }
    ];*/
    return (
        <div>
            {/* Header-Komponente hier hinzufügen */}
            <Header />
            {/* Zuerst das Plotly-Diagramm */}
            <PlotlyVisualization routes={routes} />

            {/* Danach die Tabelle */}
            <BGPRoutesTable routes={routes} />
        </div>
    );
};

export default BGPRoutenVisualisierung;
