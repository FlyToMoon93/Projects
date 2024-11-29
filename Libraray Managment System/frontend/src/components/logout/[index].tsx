"use client";

import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import ArticleService from "@/api/ArticleService";
const One = ({ article, error }: { article?: any; error?: string }) => {
    const [editorContent, setEditorContent] = useState<any>(article?.content || '');
    const [title, setTitle] = useState<any>(article?.title || '');
    const [description, setDescription] = useState<any>(article?.description || '');
    const [previewContent, setPreviewContent] = useState<string>('');
    const [isEditing, setIsEditing] = useState<boolean>(!!article); // Wenn ein Artikel vorhanden ist, wird bearbeitet
    const router = useRouter();
  const {saveArticle, updateArticle} = ArticleService()
    useEffect(() => {
        if (article) {
            setTitle(article.title);
            setDescription(article.description);
            setEditorContent(article.content);
        }
    }, [article]);

    const handleQuillChange = (value: string) => {
        setEditorContent(value);
    };

    const handlePreview = () => {
        setPreviewContent(editorContent);
    };

    const handleSave = async () => {
        try {
            const newArticle = {
                title,
                description,
                content: editorContent,
            };

            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Benutzer ist nicht authentifiziert.');
            }

            let response: string;
            if (!isEditing) {
                response = await saveArticle(newArticle, token);
            } else {
                response = await updateArticle(article.id, token, newArticle, token!);
            }

            if (response) {
                alert('Artikel wurde erfolgreich gespeichert!');
                router.push('/'); // Weiterleitung zur Startseite nach dem Speichern
            }
        } catch (error) {
            console.error('Fehler beim Speichern des Artikels:', error);
            alert('Beim Speichern des Artikels ist ein Fehler aufgetreten.');
        }
    };

    if (error) return <div>{error}</div>;

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                {isEditing ? 'Artikel bearbeiten' : 'Artikel erstellen'}
            </Typography>
            <TextField
                label="Titel"
                fullWidth
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{ mb: 2 }}
            />
            <TextField
                label="Beschreibung"
                fullWidth
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{ mb: 2 }}
            />
            <ReactQuill
                value={editorContent}
                onChange={handleQuillChange}
                theme="snow"
                modules={One.modules}
                formats={One.formats}
                style={{ height: '400px', marginBottom: '20px' }}
            />
            <Box sx={{ mt: 2 }}>
                <Button variant="contained" color="primary" onClick={handlePreview}>
                    Vorschau anzeigen
                </Button>
                <Button variant="contained" color="secondary" onClick={handleSave} sx={{ ml: 2 }}>
                    {isEditing ? 'Änderungen speichern' : 'Artikel speichern'}
                </Button>
            </Box>
            {previewContent && (
                <Box sx={{ mt: 4, p: 2, border: '1px solid #ddd', borderRadius: '8px' }}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Vorschau
                    </Typography>
                    <div dangerouslySetInnerHTML={{ __html: previewContent }} />
                </Box>
            )}
        </Box>
    );
};


// Konfiguriere die Module und Formate für Quill
One.modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }],
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        [{ align: [] }],
    ],
};

One.formats = [
    'header', 'bold', 'italic', 'underline',
    'list', 'bullet', 'link', 'image', 'align'
];


export default One;
