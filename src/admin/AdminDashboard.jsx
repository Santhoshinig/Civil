import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useTheme } from '../context/ThemeContext';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const [stats, setStats] = useState({
        products: 0,
        views: 0,
        partners: 0
    });
    const [topProducts, setTopProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const productsRef = collection(db, 'products');
            const partnersRef = collection(db, 'partners');

            const [productsSnap, partnersSnap] = await Promise.all([
                getDocs(productsRef),
                getDocs(partnersRef)
            ]);

            const topQ = query(productsRef, orderBy('views', 'desc'), limit(3));
            const topSnapshot = await getDocs(topQ);
            const productsData = topSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            // Calculate total views
            let totalViews = 0;
            productsSnap.docs.forEach(doc => {
                totalViews += (doc.data().views || 0);
            });

            setStats({
                products: productsSnap.size,
                views: totalViews,
                partners: partnersSnap.size
            });
            setTopProducts(productsData);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="admin-loading">Loading Dashboard...</div>;

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header">
                <div className="header-title-area">
                    <h1>Dashboard Overview</h1>
                    <p>Real-time insights and quick management</p>
                </div>
                <div className="dashboard-actions">
                    <button onClick={() => navigate('/admin/partners/new')} className="secondary-btn-admin">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="7" r="4"></circle><path d="M16 3.13a4 4 0 0 1 0 7.75"></path><path d="M21 21v-2a4 4 0 0 0-3-3.87"></path><path d="M9 21v-2a4 4 0 0 0-3-3.87"></path></svg>
                        Add Partner
                    </button>
                    <button onClick={() => navigate('/admin/products/new')} className="add-product-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        Add Product
                    </button>
                    <button onClick={toggleTheme} className="theme-toggle-btn" title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
                        {theme === 'light' ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                        )}
                    </button>
                </div>
            </div>

            <div className="stats-grid">
                <div className="stat-card-admin clickable" onClick={() => navigate('/admin/partners')}>
                    <div className="stat-icon partners">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    </div>
                    <div className="stat-content">
                        <h3>{stats.partners}</h3>
                        <p>Total Partners</p>
                    </div>
                </div>
                <div className="stat-card-admin clickable" onClick={() => navigate('/admin/products')}>
                    <div className="stat-icon products">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                    </div>
                    <div className="stat-content">
                        <h3>{stats.products}</h3>
                        <p>Total Products</p>
                    </div>
                </div>
                <div className="stat-card-admin">
                    <div className="stat-icon views">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    </div>
                    <div className="stat-content">
                        <h3>{stats.views.toLocaleString()}</h3>
                        <p>Total Views</p>
                    </div>
                </div>
            </div>

            <div className="dashboard-section">
                <div className="section-header-admin">
                    <h2>Top Performing Products</h2>
                    <button className="text-btn-admin" onClick={() => navigate('/admin/products')}>View All →</button>
                </div>
                <div className="top-products-list">
                    {topProducts.map((product, index) => (
                        <div key={product.id} className="top-product-item">
                            <span className="rank">{index + 1}</span>
                            <div className="product-thumb-wrapper">
                                {product.image ? (
                                    <img src={product.image} alt={product.title} className="product-thumb" />
                                ) : (
                                    <div className="product-thumb-placeholder">?</div>
                                )}
                            </div>
                            <div className="product-info">
                                <h4>{product.title}</h4>
                                <span className="product-code">{product.code}</span>
                            </div>
                            <div className="view-count-badge">
                                <span className="views-number">{product.views}</span>
                                <span className="views-label">Views</span>
                            </div>
                        </div>
                    ))}
                    {topProducts.length === 0 && (
                        <div className="empty-state-mini">
                            <p>No products found yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
