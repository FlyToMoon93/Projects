"use client";

import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { Button, TextField, Box, Typography } from '@mui/material';
import Layout from '@/app/layout/Layout';
import { useRouter } from 'next/navigation';
import useAuth from "@/app/useAuth/useAuth";
import ArticleService from "@/api/ArticleService";

const QuillEditor = ({ initialArticle }: { initialArticle?: any }) => {
    const [editorContent, setEditorContent] = useState<string>(initialArticle?.content || '');
    const [title, setTitle] = useState<string>(initialArticle?.title || '');
    const [description, setDescription] = useState<string>(initialArticle?.description || '');
    const [previewContent, setPreviewContent] = useState<string>('');
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const {saveArticle} = ArticleService()
    useEffect(() => {
        const getRole = localStorage.getItem('role');
        const token = localStorage.getItem('token');
        if (getRole ==='user' || getRole==='User' || !token) {
            router.push('/'); // Oder eine andere Seite, zu der der Benutzer geleitet werden soll
        }
    }, [router]);



    useEffect(() => {
        if (initialArticle) {
            setTitle(initialArticle.title);
            setDescription(initialArticle.description);
            setEditorContent(initialArticle.content);
        }
    }, [initialArticle]);

    // Der Handler für die Quill-Komponente
    const handleQuillChange: any = (value: string, delta: any, source: any, editor: any) => {
        setEditorContent( value);
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

            const response = await saveArticle(newArticle, token);

            if (response) {
                alert('Artikel wurde erfolgreich gespeichert!');
                router.push('/'); // Weiterleitung zur Startseite nach dem Speichern
            }
        } catch (error) {
            console.error('Fehler beim Speichern des Artikels:', error);
            alert('Beim Speichern des Artikels ist ein Fehler aufgetreten.');
        }
    };


    return (
        <Layout>
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {initialArticle ? 'Artikel bearbeiten' : 'Artikel erstellen'}
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
                    modules={QuillEditor.modules}
                    formats={QuillEditor.formats}
                    style={{ height: '400px', marginBottom: '20px' }}
                />
                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" color="primary" onClick={handlePreview}>
                        Vorschau anzeigen
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleSave} sx={{ ml: 2 }}>
                        {initialArticle ? 'Änderungen speichern' : 'Artikel speichern'}
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
        </Layout>
    );
};

QuillEditor.modules = {
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


QuillEditor.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'list', 'bullet', 'indent',
    'align', 'script',
    'link', 'image', 'video',
    'clean'  // Zum Zurücksetzen der Formatierung
];


export default QuillEditor;
