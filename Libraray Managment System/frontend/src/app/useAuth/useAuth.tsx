// hooks/useAuth.ts
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token); // Check if token exists
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setIsAuthenticated(false);
        router.push('/');

    };

    return { isAuthenticated, logout };
};

export default useAuth;
