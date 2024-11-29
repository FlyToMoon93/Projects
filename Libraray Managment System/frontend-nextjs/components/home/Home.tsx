"use client";

import React, {useEffect, useState} from 'react';
import { Box, Typography, Card, CardContent, Button, CircularProgress, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import ReactQuill from 'react-quill';
import ArticleService from "@/api/ArticleService";
import Header from "@/shreadComponent/header/Header";

const HomePage = () => {
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [editingArticle, setEditingArticle] = useState<any | null>(null);
    const router = useRouter();
    const { getAllArticles ,updateArticle, deleteArticle} = ArticleService();

    useEffect(() => {
        const fetchArticles = async () => {
            const token = localStorage.getItem('token');
            const getRole = localStorage.getItem('role');
            setRole(getRole);

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
    }, []);

    const handleEdit = (article: any) => {
        setEditingArticle({
            ...article,
            content: article.content
        });
    };

    const handleSave = async () => {
        if (editingArticle) {
            const token = localStorage.getItem('token');
            try {
                await updateArticle(editingArticle.id,token, {
                    title: editingArticle.title,
                    description: editingArticle.description,
                    content: editingArticle.content,
                }, token!);
                setEditingArticle(null);
                // Artikel neu laden
                const response = await getAllArticles(token!);
                setArticles(response);
            } catch (error) {
                console.error('Fehler beim Speichern des Artikels:', error);
                setError('Fehler beim Speichern des Artikels.');
            }
        }
    };

    const handleDelete = async (articleId: number) => {
        if (!articleId) {
            setError('Ungültige Artikel-ID.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await deleteArticle(articleId, token!);
            setArticles(prevArticles => prevArticles.filter(article => article.id !== articleId));
        } catch (error) {
            console.error('Fehler beim Löschen des Artikels:', error);
            setError('Fehler beim Löschen des Artikels.');
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Header>
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
                                        <Box sx={{paddingTop:'40px'}}>
                                            <Button  variant="outlined" color="primary" onClick={handleSave}>
                                                Speichern
                                            </Button>
                                            <Button variant="outlined" color="secondary" onClick={() => setEditingArticle(null)}>
                                                Abbrechen
                                            </Button>
                                        </Box>
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
                                        {(role === 'admin' || role === 'Admin') &&
                                            <Box display="flex" justifyContent="space-between">
                                                <Button variant="outlined" color="primary" onClick={() => handleEdit(article)}>Bearbeiten</Button>
                                                <Button variant="outlined" color="secondary" onClick={() => handleDelete(article.id)}>Löschen</Button>
                                            </Box>
                                        }
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    ))
                )}
            </Box>
        </Box>
        </Header>
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
        ['clean']  // Schaltfläche zum Zurücksetzen der Formatierung
    ],
};


HomePage.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'list', 'bullet', 'indent',
    'align', 'script',
    'link', 'image', 'video',
    'clean'  // Zum Zurücksetzen der Formatierung
];



export default HomePage;
