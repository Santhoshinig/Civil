import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/Admin.css';

const AdminLayout = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/admin');
    };

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <div className="admin-brand">
                        <span className="brand-icon">🏗️</span>
                        <span className="brand-text">Civil Doctor</span>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <NavLink to="/admin/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                        <span className="nav-icon">📊</span>
                        <span className="nav-text">Dashboard</span>
                    </NavLink>
                    <NavLink to="/admin/products" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                        <span className="nav-icon">📦</span>
                        <span className="nav-text">Products</span>
                    </NavLink>
                </nav>

                <div className="sidebar-footer">
                    <div className="admin-user">
                        <div className="user-avatar">
                            {user?.email?.[0].toUpperCase() || 'A'}
                        </div>
                        <div className="user-info">
                            <span className="user-email">{user?.email}</span>
                            <span className="user-role">Administrator</span>
                        </div>
                    </div>
                    <a href="/" className="back-to-site-btn">
                        <span>🏠</span> Back to Website
                    </a>
                    <button onClick={handleLogout} className="logout-btn">
                        <span>🚪</span> Logout
                    </button>
                </div>
            </aside>

            <main className="admin-main">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
