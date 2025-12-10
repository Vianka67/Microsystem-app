import { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/auth.service';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (token && storedUser) {
            setUser({ email: storedUser });
            setIsAuthenticated(true);
        }
    }, [token]);

    const login = async (email, password) => {
        setIsLoading(true);
        try {
            const result = await authAPI.login({ email, password });

            if (result.access) {
                localStorage.setItem('token', result.access);
                localStorage.setItem('user', email);
                setToken(result.access);
                setUser({ email });
                setIsAuthenticated(true);
                return { success: true };
            } else {
                return { success: false, error: result.detail || 'Credenciales incorrectas' };
            }
        } catch (error) {
            return { success: false, error: 'Error de conexión' };
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};



