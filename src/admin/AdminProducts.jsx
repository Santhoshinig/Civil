import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
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
            } catch (error) {
                console.error("Error deleting product:", error);
                alert("Failed to delete product");
            }
        }
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
                <button onClick={() => navigate('/admin/products/new')} className="add-product-btn">
                    <span>+</span> Add New Product
                </button>
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
                    <div key={product.id} className="product-card-admin">
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
                        <div className="product-actions">
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
