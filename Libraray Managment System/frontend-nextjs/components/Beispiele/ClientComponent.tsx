// components/ClientComponent.js
'use client';

import React, { useState, useEffect } from 'react';

const ClientComponent = ({ initialData }) => {
    const [data, setData] = useState(initialData);

    useEffect(() => {
        // You can use this useEffect hook for additional client-side logic or data manipulation
        // For example, you might fetch more data or handle user interactions
    }, []);

    return (
        <div>
            <h2>Client Component</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            {/* Render the data or add interactive elements */}
        </div>
    );
};

export default ClientComponent;
