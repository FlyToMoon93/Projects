// app/layout.tsx
import { ReactNode } from 'react';
import {Metadata} from "next";
import {Inter} from 'next/font/google';

const inter= Inter({subsets:['latin']})

export const metadata: Metadata = {
    title: "Created by Khalil",
    description: "Cloud application project" ,
}

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html>
        <body className={inter.className}>{children}</body>
        </html>
    );
}
