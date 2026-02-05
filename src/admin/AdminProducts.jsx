import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIds, setSelectedIds] = useState([]);
    const [isSelectMode, setIsSelectMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'products'));
            const productsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setProducts(productsData);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteDoc(doc(db, 'products', id));
                setProducts(products.filter(p => p.id !== id));
                setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
            } catch (error) {
                console.error("Error deleting product:", error);
                alert("Failed to delete product");
            }
        }
    };

    const handleBulkDelete = async () => {
        if (selectedIds.length === 0) return;

        if (window.confirm(`Are you sure you want to delete ${selectedIds.length} products?`)) {
            setLoading(true);
            try {
                const deletePromises = selectedIds.map(id => deleteDoc(doc(db, 'products', id)));
                await Promise.all(deletePromises);
                setProducts(products.filter(p => !selectedIds.includes(p.id)));
                setSelectedIds([]);
                setIsSelectMode(false);
                alert('Successfully deleted selected products');
            } catch (error) {
                console.error("Error bulk deleting products:", error);
                alert("Failed to delete some products");
            } finally {
                setLoading(false);
            }
        }
    };

    const toggleSelect = (id) => {
        if (!isSelectMode) return;
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const enterSelectMode = () => {
        setIsSelectMode(true);
    };

    const cancelSelectMode = () => {
        setIsSelectMode(false);
        setSelectedIds([]);
    };

    const filteredProducts = products.filter(product =>
        product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.code?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="admin-loading">Loading Products...</div>;

    return (
        <div className="admin-products">
            <div className="products-header">
                <div className="header-left">
                    <h1>Products</h1>
                    <p>Manage your product catalog</p>
                </div>
                <div className="header-actions">
                    {selectedIds.length > 0 && (
                        <button onClick={handleBulkDelete} className="bulk-delete-btn">
                            🗑️ Delete Selected ({selectedIds.length})
                        </button>
                    )}

                    {!isSelectMode ? (
                        <button onClick={enterSelectMode} className="secondary-btn-admin">
                            🔍 Select Products
                        </button>
                    ) : (
                        <button onClick={cancelSelectMode} className="cancel-selection-btn">
                            ✕ Cancel
                        </button>
                    )}

                    <button onClick={() => navigate('/admin/products/bulk')} className="bulk-upload-btn-admin">
                        🚀 Bulk Upload
                    </button>
                    <button onClick={() => navigate('/admin/products/new')} className="add-product-btn">
                        <span>+</span> Add New Product
                    </button>
                </div>
            </div>

            <div className="products-toolbar">
                <div className="search-box">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="products-grid-admin">
                {filteredProducts.map(product => (
                    <div
                        key={product.id}
                        className={`product-card-admin ${isSelectMode ? 'clickable' : ''} ${selectedIds.includes(product.id) ? 'selected' : ''}`}
                        onClick={() => isSelectMode && toggleSelect(product.id)}
                    >
                        {isSelectMode && (
                            <div className="selection-overlay">
                                <input
                                    type="checkbox"
                                    checked={selectedIds.includes(product.id)}
                                    onChange={() => { }} // Handled by card click
                                />
                            </div>
                        )}
                        <div className="product-image-wrapper">
                            {product.image ? (
                                <img src={product.image} alt={product.title} />
                            ) : (
                                <div className="no-image-placeholder">No Image</div>
                            )}
                            <div className="view-badge">
                                👁️ {product.views || 0}
                            </div>
                        </div>
                        <div className="product-details">
                            <h3>{product.title}</h3>
                            <p className="product-code">{product.code}</p>
                            <div className="product-tags">
                                {product.tags?.slice(0, 3).map((tag, i) => (
                                    <span key={i} className="tag">{tag}</span>
                                ))}
                            </div>
                        </div>
                        <div className="product-actions" onClick={(e) => e.stopPropagation()}>
                            <button
                                onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                                className="action-btn edit"
                            >
                                ✏️ Edit
                            </button>
                            <button
                                onClick={() => handleDelete(product.id)}
                                className="action-btn delete"
                            >
                                🗑️ Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="empty-state">
                    <span className="empty-icon">📦</span>
                    <h3>No Products Found</h3>
                    <p>Try adjusting your search or add a new product.</p>
                </div>
            )}
        </div>
    );
};

export default AdminProducts;
