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
        views: 0
    });
    const [topProducts, setTopProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const productsRef = collection(db, 'products');
            const q = query(productsRef, orderBy('views', 'desc'), limit(3));
            const snapshot = await getDocs(q);
            const allSnapshot = await getDocs(productsRef);

            const productsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            // Calculate total views
            let totalViews = 0;
            allSnapshot.docs.forEach(doc => {
                totalViews += (doc.data().views || 0);
            });

            setStats({
                products: allSnapshot.size,
                views: totalViews
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
                <div>
                    <h1>Dashboard Overview</h1>
                    <p>Performance insights for your top performing products</p>
                </div>
                <div className="dashboard-actions">
                    <button onClick={() => navigate('/admin/products/new')} className="add-product-btn">
                        <span>+</span> Add Product
                    </button>
                    <button onClick={toggleTheme} className="theme-toggle-btn" title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
                        {theme === 'light' ? '◐' : '◑'}
                    </button>
                </div>
            </div>

            <div className="stats-grid">
                <div className="stat-card-admin clickable" onClick={() => navigate('/admin/products')}>
                    <div className="stat-icon products">▦</div>
                    <div className="stat-content">
                        <h3>{stats.products}</h3>
                        <p>Total Products</p>
                    </div>
                </div>
                <div className="stat-card-admin">
                    <div className="stat-icon views">◉</div>
                    <div className="stat-content">
                        <h3>{stats.views}</h3>
                        <p>Total Views</p>
                    </div>
                </div>
            </div>

            <div className="dashboard-section">
                <h2>Top 3 Performing Products</h2>
                <div className="top-products-list">
                    {topProducts.map((product, index) => (
                        <div key={product.id} className="top-product-item">
                            <span className="rank">#{index + 1}</span>
                            {product.image && <img src={product.image} alt={product.title} className="product-thumb" />}
                            <div className="product-info">
                                <h4>{product.title}</h4>
                                <span className="product-code">{product.code}</span>
                            </div>
                            <div className="view-count">
                                {product.views > 0 ? (
                                    <>
                                        <span className="views-number">{product.views}</span>
                                        <span className="views-label">Views</span>
                                    </>
                                ) : (
                                    <span className="no-views-msg">No views yet</span>
                                )}
                            </div>
                        </div>
                    ))}
                    {topProducts.length === 0 && <p className="empty-state">No products found yet.</p>}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
