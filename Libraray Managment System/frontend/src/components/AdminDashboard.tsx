"use client";

import React from "react";
import { Box, Container, Button, Typography } from '@mui/material';
import Layout from "@/app/layout/Layout";
import { useRouter } from "next/navigation";
import { styled } from '@mui/material/styles';
import PeopleIcon from '@mui/icons-material/People';
import BookIcon from '@mui/icons-material/Book';
import ArticleIcon from '@mui/icons-material/Article';

// Custom Styled Components
const DashboardContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    marginTop: '80px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    color: '#333333',
    textAlign: 'center',
}));

const StyledButton = styled(Button)(({ theme }) => ({
    width: '100%',
    margin: '10px 0',
    textTransform: 'none',
    fontWeight: 600,
    padding: '12px',
    borderRadius: '12px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    backgroundColor: '#007BFF',
    color: '#ffffff',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        backgroundColor: '#0056b3',
    },
    fontSize: '1rem',
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    width: '100%',
    marginTop: '20px',
}));

const SectionIcon = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    padding: '20px',
    borderRadius: '50%',
    backgroundColor: '#007BFF',
    color: '#ffffff',
    width: '80px',
    height: '80px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
}));

const SectionTagline = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    fontSize: '1.2rem',
    marginBottom: '10px',
    color: '#007BFF',
}));

const AdminDashboard = () => {
    const router = useRouter();

    return (
        <Layout>
            <DashboardContainer maxWidth="lg">

                <SectionIcon>
                    <PeopleIcon fontSize="large" />
                </SectionIcon>
                <SectionTagline>
                    Manage Your Users
                </SectionTagline>
                <ButtonContainer>
                    <StyledButton onClick={() => router.push('/dashboardPage/allUsers')} variant="contained">
                        All Users
                    </StyledButton>
                    <StyledButton onClick={() => router.push('/dashboardPage/deleteUser')} variant="contained" color="error">
                        Delete Users
                    </StyledButton>
                </ButtonContainer>

                <SectionIcon>
                    <BookIcon fontSize="large" />
                </SectionIcon>
                <SectionTagline>
                    Control Your Books
                </SectionTagline>
                <ButtonContainer>
                    <StyledButton variant="contained" onClick={() => router.push('/dashboardPage/addBook')}>
                        Add Books
                    </StyledButton>
                    <StyledButton variant="contained" color="error" onClick={() => router.push('/dashboardPage/deleteBook')}>
                        Delete Books
                    </StyledButton>
                </ButtonContainer>

                <SectionIcon>
                    <ArticleIcon fontSize="large" />
                </SectionIcon>
                <SectionTagline>
                    Manage Your Articles
                </SectionTagline>
                <ButtonContainer>
                    <StyledButton variant="contained" onClick={() => router.push('/dashboardPage/addArticle')}>
                        Add Articles
                    </StyledButton>
                    <StyledButton variant="contained" color="error" onClick={() => router.push('/dashboardPage/deleteArticle')}>
                        Delete | Edit Articles
                    </StyledButton>
                </ButtonContainer>
            </DashboardContainer>
        </Layout>
    );
};

export default AdminDashboard;
