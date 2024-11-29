'use client'
// hooks/useAuth.ts
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import {cookies} from "next/headers";
import Cookies from "js-cookie";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('token');
        setIsAuthenticated(!!token); // Check if token exists
    }, []);

    const logout = () => {
        Cookies.remove('token'); // Entferne den Token aus den Cookies
        Cookies.remove('role');
        setIsAuthenticated(false);
        router.push('/'); // Redirect to login page

            window.location.reload(); // Neuladen der Seite

    };

    return { isAuthenticated, logout };
};

export default useAuth;
