'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Button, CircularProgress, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import ReactQuill from 'react-quill';
import ArticleService from "@/api/ArticleService";
import useAuth from "@/app/useAuth/useAuth";

const HomePage = () => {
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [role, setRole] = useState<string | undefined>(null);
    const [editingArticle, setEditingArticle] = useState<any | null>(null);
    const router = useRouter();
    const {isAuthenticated,logout} = useAuth();
    const { getAllArticles, updateArticle, deleteArticle } = ArticleService();
    useEffect(() => {
        const fetchArticles = async () => {
            const token =  localStorage.getItem("token");

            const getRole =localStorage.getItem("role");
            setRole(getRole);
            console.log(token)

            if (!token) {

                setError('Melde dich bitte erst einmal an, um Artikel lesen zu können!');
                setLoading(false);
                return;
            }

            try {
                const response = await getAllArticles(token);
                setArticles(response);
            } catch (error) {
                console.error('Fehler beim Abrufen der Artikel:', error);
                setError('Fehler beim Abrufen der Artikel.');
            } finally {
                setLoading(false);
            }
        };

        fetchArticles().then(r => console.log(r));
    }, [router]);



    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            {error && (
                <Box mb={2} alignItems="center" justifyContent="center" textAlign="center">
                    <Typography color="error">{error}</Typography>
                </Box>
            )}
            <Box>
                {articles.length === 0 ? (
                    <Typography textAlign="center" variant="h6">Keine Artikel vorhanden.</Typography>
                ) : (
                    articles.map((article) => (
                        <Card key={article.id} sx={{ mb: 2 }}>
                            <CardContent>
                                {editingArticle && editingArticle.id === article.id ? (
                                    <>
                                        <TextField
                                            label="Titel"
                                            value={editingArticle.title}
                                            onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                                            fullWidth
                                            margin="normal"
                                        />
                                        <TextField
                                            label="Beschreibung"
                                            value={editingArticle.description}
                                            onChange={(e) => setEditingArticle({ ...editingArticle, description: e.target.value })}
                                            fullWidth
                                            margin="normal"
                                        />
                                        <ReactQuill
                                            value={editingArticle.content}
                                            onChange={(content) => setEditingArticle({ ...editingArticle, content })}
                                            theme="snow"
                                            modules={HomePage.modules}
                                            formats={HomePage.formats}
                                            style={{ height: '400px', marginBottom: '20px' }}
                                        />
npm
                                    </>
                                ) : (
                                    <>
                                        <Typography variant="h5" gutterBottom>{article.title}</Typography>
                                        <Typography variant="body2" color="textSecondary" gutterBottom>
                                            {article.description}
                                        </Typography>
                                        <Box
                                            sx={{ mt: 2, mb: 2 }}
                                            dangerouslySetInnerHTML={{ __html: article.content }}
                                        />

                                    </>
                                )}
                            </CardContent>
                        </Card>
                    ))
                )}
            </Box>
        </Box>
    );
};

HomePage.modules = {
    toolbar: [
        [{ header: [1, 2, 3, false] }],
        [{ font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ color: [] }, { background: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ align: [] }],
        ['link', 'image', 'video'],
        ['clean']
    ],
};

HomePage.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'list', 'bullet', 'indent',
    'align', 'script',
    'link', 'image', 'video',
    'clean'
];

export default HomePage;
