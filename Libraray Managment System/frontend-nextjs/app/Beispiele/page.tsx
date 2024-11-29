// app/page.js (Server Component)
import React from 'react';
import ClientComponent from '@/components/Beispiele/ClientComponent';

const fetchData = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    console.log(response)
    return await response.json();
};

const Page = async () => {
    const data = await fetchData();

    return (
        <div>
            <h1>This is a Server Component</h1>
            <ClientComponent initialData={data} />
        </div>
    );
};

export default Page;
