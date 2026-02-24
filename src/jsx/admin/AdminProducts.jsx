import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIds, setSelectedIds] = useState([]);
    const [isSelectMode, setIsSelectMode] = useState(false);
    const navigate = useNavigate();
    const { partnerId } = useParams();

    useEffect(() => {
        const loadPageData = async () => {
            setLoading(true);
            const loadedPartners = await fetchPartners();
            await fetchProducts(loadedPartners);
            setLoading(false);
        };
        loadPageData();
    }, [partnerId]);

    const fetchPartners = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'partners'));
            const partnersData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setPartners(partnersData);
            return partnersData;
        } catch (error) {
            console.error("Error fetching partners:", error);
            return [];
        }
    };

    const fetchProducts = async (currentPartnersList = partners) => {
        try {
            const querySnapshot = await getDocs(collection(db, 'products'));
            let productsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Filter by partner if in partner context
            if (partnerId) {
                const currentPartner = currentPartnersList.find(p => p.id === partnerId);
                productsData = productsData.filter(p =>
                    p.partner?.toLowerCase() === partnerId.toLowerCase() ||
                    (currentPartner && p.brand?.toLowerCase() === currentPartner.name?.toLowerCase())
                );
            }

            setProducts(productsData);
        } catch (error) {
            console.error("Error fetching products:", error);
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

    if (loading) {
        return (
            <div className="admin-loading-container" style={{ padding: '100px 0', textAlign: 'center' }}>
                <div className="loading-spinner" style={{ margin: '0 auto 20px' }}></div>
                <p style={{ color: 'var(--admin-text-muted)', fontWeight: '600' }}>Loading Product Catalog...</p>
            </div>
        );
    }

    const currentPartner = partners.find(p => p.id === partnerId);
    const currentPartnerName = currentPartner ? currentPartner.name : null;

    return (
        <div className="admin-products">
            {partnerId && (
                <Link to="/admin/partners" className="back-link-admin">
                    ← Back to Partners
                </Link>
            )}
            <div className="products-header">
                <div className="header-left">
                    <h1>{currentPartnerName ? `${currentPartnerName} Products` : 'All Products'}</h1>
                    <p>{currentPartnerName ? `Managing catalog for ${currentPartnerName}` : 'Manage your entire product catalog'}</p>
                </div>
                <div className="header-actions">
                    <div className="toolbar-group">
                        <div className="search-box-mini">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <select
                            className="brand-filter-select"
                            value={partnerId || ''}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (val) {
                                    navigate(`/admin/partners/${val}/products`);
                                } else {
                                    navigate('/admin/products');
                                }
                            }}
                        >
                            <option value="">All Brands</option>
                            {partners.map(p => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>
                    </div>

                    {selectedIds.length > 0 && (
                        <button onClick={handleBulkDelete} className="bulk-delete-btn">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        </button>
                    )}

                    {!isSelectMode ? (
                        <button onClick={enterSelectMode} className="secondary-btn-admin" title="Select Products">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                            <span>Select</span>
                        </button>
                    ) : (
                        <button onClick={cancelSelectMode} className="cancel-selection-btn">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            Cancel
                        </button>
                    )}

                    <button onClick={() => navigate('/admin/products/bulk')} className="secondary-btn-admin" title="Bulk Upload">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                        <span>Bulk</span>
                    </button>
                    <button
                        onClick={() => navigate('/admin/products/new', { state: { preselectPartner: partnerId } })}
                        className="add-product-btn"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        <span>Add</span>
                    </button>
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
                                title="Edit Product"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(product.id)}
                                className="action-btn delete"
                                title="Delete Product"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="empty-state">
                    <span className="empty-icon">📦</span>
                    <h3>No Products Found</h3>
                    <p>Try adjusting your search or add a new product for this partner.</p>
                </div>
            )}
        </div>
    );
};

export default AdminProducts;
