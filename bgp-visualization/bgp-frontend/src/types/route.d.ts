export interface Route {
    prefix: string;       // If this property should exist in Route, add it here
    next_hop: string;     // Add if this property should exist in Route
    timestamp: string;    // Add if this property should exist in Route
    anomaly: boolean;     // Add if this property should exist in Route
}

interface Route1 {
    ip: string;
    city_name: string;
    state_name: string;
    country_name: string;
    latitude: number;
    longitude: number;
    score: number;
}
