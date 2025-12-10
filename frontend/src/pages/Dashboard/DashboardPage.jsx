import React, { useState, useEffect } from 'react';
import { productsAPI } from '../../services/products.service';

const DashboardPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const loadProducts = async () => {
            const data = await productsAPI.getProducts();
            setProducts(data);
        };
        loadProducts();
    }, []);

    // Calcular métricas
    const totalProducts = products.length;
    const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
    const totalValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);

    return (
        <div className="dashboard-content">
            {/* Metrics Cards */}
            <div className="metrics-grid">
                <div className="metric-card">
                    <h3>Productos</h3>
                    <div className="metric-value">{totalProducts}</div>
                </div>
                <div className="metric-card">
                    <h3>Stock Total</h3>
                    <div className="metric-value">{totalStock}</div>
                </div>
                <div className="metric-card">
                    <h3>Mi Rol</h3>
                    <div className="metric-value">Admin</div>
                </div>
                <div className="metric-card">
                    <h3>Valor Total</h3>
                    <div className="metric-value">${totalValue.toLocaleString()}</div>
                </div>
            </div>

            {/* Recent Products */}
            <div className="recent-products">
                <h3>Productos Recientes</h3>
                <div className="products-grid">
                    {products.slice(0, 4).map(product => (
                        <div key={product.id} className="product-card">
                            <div className="product-info">
                                <h4>{product.name}</h4>
                                <span className="product-category">
                                    {product.category || 'General'} • Stock: {product.stock}
                                </span>
                            </div>
                            <div className="product-price">${product.price}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
