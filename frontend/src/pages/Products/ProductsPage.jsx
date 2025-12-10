import React, { useState, useEffect } from 'react';
import { productsAPI } from '../../services/products.service';
import ProductForm from '../../components/ui/ProductForm';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const loadProducts = async () => {
        const data = await productsAPI.getProducts();
        setProducts(data);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleCreate = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este producto?')) {
            const result = await productsAPI.deleteProduct(id);
            if (result.success) {
                loadProducts();
            } else {
                alert(result.error);
            }
        }
    };

    const handleSubmit = async (productData) => {
        let result;
        if (editingProduct) {
            result = await productsAPI.updateProduct(editingProduct.id, productData);
        } else {
            result = await productsAPI.createProduct(productData);
        }

        if (result.success) {
            setIsModalOpen(false);
            loadProducts();
        } else {
            alert(result.error);
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="products-content">
            <div className="products-header">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="add-product-btn" onClick={handleCreate}>+ Nuevo Producto</button>
            </div>

            <div className="products-list">
                {filteredProducts.map(product => (
                    <div key={product.id} className="product-item">
                        <div className="product-main">
                            <h4>{product.name}</h4>
                            <div className="product-details">
                                <span className="price">${product.price}</span>
                                <span className="stock">Stock: {product.stock}</span>
                            </div>
                        </div>
                        <div className="product-actions">
                            <div className="product-category-tag" style={{ marginRight: '10px', display: 'inline-block' }}>
                                {product.category || 'General'}
                            </div>
                            <button className="btn-edit" onClick={() => handleEdit(product)}>Editar</button>
                            <button className="btn-danger" onClick={() => handleDelete(product.id)}>Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <ProductForm
                    product={editingProduct}
                    onSubmit={handleSubmit}
                    onCancel={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default ProductsPage;
