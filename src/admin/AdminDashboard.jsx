import { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';
import { db } from '../firebase/config';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        products: 0,
        views: 0,
        growth: 0
    });
    const [recentProducts, setRecentProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const productsRef = collection(db, 'products');
            const q = query(productsRef, orderBy('createdAt', 'desc'), limit(5));
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
                views: totalViews,
                growth: 12 // Mock growth
            });
            setRecentProducts(productsData);
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
                <h1>Dashboard Overview</h1>
                <p>Welcome back! Here's what's happening with your products.</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card-admin">
                    <div className="stat-icon products">📦</div>
                    <div className="stat-content">
                        <h3>{stats.products}</h3>
                        <p>Total Products</p>
                    </div>
                </div>
                <div className="stat-card-admin">
                    <div className="stat-icon views">👀</div>
                    <div className="stat-content">
                        <h3>{stats.views}</h3>
                        <p>Total Views</p>
                    </div>
                </div>
                <div className="stat-card-admin">
                    <div className="stat-icon growth">📈</div>
                    <div className="stat-content">
                        <h3>+{stats.growth}%</h3>
                        <p>Monthly Growth</p>
                    </div>
                </div>
            </div>

            <div className="dashboard-section">
                <h2>Recent Products</h2>
                <div className="top-products-list">
                    {recentProducts.map((product, index) => (
                        <div key={product.id} className="top-product-item">
                            <span className="rank">#{index + 1}</span>
                            {product.image && <img src={product.image} alt={product.title} className="product-thumb" />}
                            <div className="product-info">
                                <h4>{product.title}</h4>
                                <span className="product-code">{product.code}</span>
                            </div>
                            <div className="view-count">
                                <span className="views-number">{product.views || 0}</span>
                                <span className="views-label">Views</span>
                            </div>
                        </div>
                    ))}
                    {recentProducts.length === 0 && <p className="empty-state">No products found.</p>}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
