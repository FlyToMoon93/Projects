"use client";

import React, { useEffect, useState } from "react";
import AdminDashboard from "@/components/AdminDashboard";
import UserDashboard from "@/components/UserDashboard";
import { useRouter } from "next/navigation";
import Layout from "@/app/layout/Layout";

const DashboardPage = () => {
    const [role, setRole] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const userRole = localStorage.getItem('role');
        if (!userRole) {
            // Redirect to login if no role found
            router.push('/');
        } else {
            setRole(userRole);
        }
    }, [router]);

    if (role === 'admin' || role === 'adminOnly'|| role === 'Admin') {
        return <AdminDashboard />;
    } else if (role === 'user' || role === 'User') {
        return <UserDashboard />;
    }else if(role === 'adminuser' || role === 'Adminuser') {
        return <UserDashboard />;
    }
    else {
        return <Layout><p style={{textAlign:'center'}}>Unauthorized</p></Layout>
    }
};

export default DashboardPage;
