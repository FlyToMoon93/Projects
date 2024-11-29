export interface Route {
    prefix: string;       // If this property should exist in Route, add it here
    next_hop: string;     // Add if this property should exist in Route
    timestamp: string;    // Add if this property should exist in Route
    anomaly: boolean;     // Add if this property should exist in Route
}

export interface Route1 {
    city_name: string;
    country_name: string;
    ip: string;
    latitude: number;
    longitude: number;
    score: number;
    state_name: string;
    country_code_alpha2: string;
}
