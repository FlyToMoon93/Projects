
const useBooksService = () => {

    const saveBook = async (articleData: {
        title: string;
        description: string;
        content: string;
    }, token: string) => {
        try {
            const response = await fetch('http://localhost:8080/dashboardPage/addBook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(articleData),
            });

            if (!response.ok) {
                throw new Error(`Save article failed: ${response.statusText}`);
            }

            const savedArticle = await response.json();
            localStorage.setItem('articleId', savedArticle.id);
            console.log('Saved article:', savedArticle);
            return savedArticle;
        } catch (err) {
            throw err;
        }
    };

    const getBooks = async (token: string, bookId: number) => {
        try {
            const response = await fetch(`http://localhost:8080/getBooks/${bookId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error(`Get article failed: ${response.statusText}`);
            }

            return await response.json();
        } catch (err) {
            throw err;
        }
    };

    const getAllBooks = async (token: string) => {
        try {
            const response = await fetch('http://localhost:8080/getAllBooks', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error(`Get all articles failed: ${response.statusText}`);
            }

            return await response.json();
        } catch (err) {
            throw err;
        }
    };


    const deleteBook = async (bookId: number, token: string) => {
        try {
            const response = await fetch(`http://localhost:8080/deleteBook/${bookId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error(`Delete article failed: ${response.statusText}`);
            }

            // Prüfen Sie, ob eine Antwort vorhanden ist und parsen Sie JSON nur dann
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            }

            // Falls keine JSON-Antwort zurückkommt, geben wir null oder einen leeren Wert zurück
            return null;
        } catch (err) {
            throw err;
        }
    };

    return {
        saveBook,
        getBooks,
        getAllBooks,
        deleteBook,
    };
};

export default useBooksService;