import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useLocation } from 'react-router-dom';

const Header = () => {
    const { logout, user } = useAuth();
    const location = useLocation();

    const getTitle = () => {
        switch (location.pathname) {
            case '/': return '📊 Dashboard';
            case '/products': return '📦 Gestión de Productos';
            case '/profile': return '👤 Mi Perfil';
            default: return 'MicroSystem';
        }
    };

    return (
        <header className="content-header">
            <div className="header-left">
                <h1>{getTitle()}</h1>
            </div>
            <div className="header-right">
                <span className="user-info">Hola, {user?.email || 'Usuario'}</span>
                <button className="logout-btn" onClick={logout}>
                    🚪 Cerrar Sesión
                </button>
            </div>
        </header>
    );
};

export default Header;
