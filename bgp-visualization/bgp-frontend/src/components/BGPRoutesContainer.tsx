import React, { useState } from 'react';
import BGPRoutesTable from './BGPRoutesTable';
import PlotlyVisualization from './PlotlyVisualization';
import { Route } from '../types/route';

interface BGPRoutesContainerProps {
    routes: Route[];
}

const BGPRoutesContainer: React.FC<BGPRoutesContainerProps> = ({ routes }) => {
    const [filteredRoutes, setFilteredRoutes] = useState<Route[]>(routes);

    // Define the onFilterChange function to handle updates to filteredRoutes
    const handleFilterChange = (newFilteredRoutes: Route[]) => {
        setFilteredRoutes(newFilteredRoutes);
    };

    return (
        <div>
            <PlotlyVisualization routes={filteredRoutes} />
            {/* Pass the handleFilterChange function to BGPRoutesTable as the onFilterChange prop */}
            <BGPRoutesTable routes={filteredRoutes} onFilterChange={handleFilterChange} />
        </div>
    );
};

export default BGPRoutesContainer;
