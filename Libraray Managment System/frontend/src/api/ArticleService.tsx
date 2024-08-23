
const useArticleService = () => {



    const saveArticle = async (articleData: {
        title: string;
        description: string;
        content: string;
    }, token: string) => {
        try {
            const response = await fetch('http://localhost:8080/articles/save', {
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

    const getArticles = async (token: string, articleId: number) => {
        try {
            const response = await fetch(`http://localhost:8080/articles/${articleId}`, {
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

    const getAllArticles = async (token: string) => {
        try {
            const response = await fetch('http://localhost:8080/articles', {
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

    const updateArticle = async (articleId: number, s: string, articleData: {
        title: string;
        description: string;
        content: string
    }, token: string) => {
        try {
            const response = await fetch(`http://localhost:8080/articles/${articleId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(articleData),
            });

            if (!response.ok) {
                throw new Error(`Update article failed: ${response.statusText}`);
            }

            return await response.json();
        } catch (err) {
            throw err;
        }
    };

    const deleteArticle = async (articleId: number, token: string) => {
        try {
            const response = await fetch(`http://localhost:8080/articles/${articleId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error(`Delete article failed: ${response.statusText}`);
            }

            return await response.json();
        } catch (err) {
            throw err;
        }
    };

    return {
        saveArticle,
        getArticles,
        getAllArticles,
        updateArticle,
        deleteArticle,
    };
};

export default useArticleService;
