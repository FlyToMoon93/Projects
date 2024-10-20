import React, {useState} from 'react';
import BGPRoutesTable from './BGPRoutesTable';
import PlotlyVisualization from './PlotlyVisualization';
import { Route } from '../types/route';

interface BGPRoutesContainerProps {
    routes: Route[];
}

const BGPRoutesContainer: React.FC<BGPRoutesContainerProps> = ({ routes }) => {
    const [filteredRoutes, setFilteredRoutes] = useState<Route[]>(routes);



    return (
        <div>

            <PlotlyVisualization routes={filteredRoutes} />
            <BGPRoutesTable routes={routes} onFilterChange={setFilteredRoutes} />
        </div>
    );
};

export default BGPRoutesContainer;
