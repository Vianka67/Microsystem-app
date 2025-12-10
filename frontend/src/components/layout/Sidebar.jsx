import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();
    const activeTab = location.pathname;

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h2>🛍️ MicroSystem</h2>
            </div>

            <nav className="sidebar-nav">
                <Link to="/" className={activeTab === '/' ? 'nav-btn active' : 'nav-btn'}>
                    📊 Dashboard
                </Link>
                <Link to="/products" className={activeTab === '/products' ? 'nav-btn active' : 'nav-btn'}>
                    📦 Productos
                </Link>
                <Link to="/profile" className={activeTab === '/profile' ? 'nav-btn active' : 'nav-btn'}>
                    👤 Perfil
                </Link>
            </nav>
        </div>
    );
};

export default Sidebar;
