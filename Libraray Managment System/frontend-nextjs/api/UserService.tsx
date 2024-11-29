
const useUserService = () => {


    const login = async (email: string, password: string) => {
        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error(`Login failed: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Login response:', data);
            return data;
        } catch (err) {
            throw err;
        }
    };

    const register = async (formData: {
        password: string;
        firstname: string;
        lastname: string;
        email: string;
        role: string;
    }, token: string) => {
        try {
            const response = await fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`Registration failed: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (err) {
            throw err;
        }
    };

    const getProfile = async (token: string) => {
        try {
            const response = await fetch('http://localhost:8080/adminuser/get-profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error(`Get profile failed: ${response.statusText}`);
            }

            return await response.json();
        } catch (err) {
            throw err;
        }
    };

    const getUserById = async (userId: string, token: string) => {
        try {
            const response = await fetch(`http://localhost:8080/admin/get-users/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error(`Get user by ID failed: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (err) {
            throw err;
        }
    };

    const getUsers = async (token: string) => {
        try {
            const response = await fetch('http://localhost:8080/admin/get-all-users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error(`Get users failed: ${response.statusText}`);
            }

            const data = await response.json();
            return data.userList;
        } catch (err) {
            throw err;
        }
    };

    const deleteUser = async (userId: number, token: string) => {
        try {
            const response = await fetch(`http://localhost:8080/admin/delete/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error(`Delete user failed: ${response.statusText}`);
            }

            return await response.json();
        } catch (err) {
            throw err;
        }
    };

    const updateUser = async (userId: string, token: string, userData: string) => {
        try {
            const response = await fetch(`http://localhost:8080/admin/update/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error(`Update user failed: ${response.statusText}`);
            }

            return await response.json();
        } catch (err) {
            throw err;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    };

    const isAuthenticated = () => !!localStorage.getItem('token');

    const isAdmin = () => localStorage.getItem('role') === 'ADMIN';

    const isUser = () => localStorage.getItem('role') === 'USER';

    const isAdminOnly = () => isAuthenticated() && isAdmin();

    return {
        login,
        register,
        getProfile,
        getUserById,
        getUsers,
        deleteUser,
        updateUser,
        logout,
        isAuthenticated,
        isAdmin,
        isUser,
        isAdminOnly,
    };
};

export default useUserService;
