import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../context/ThemeContext';
import '../styles/Admin.css';
import '../styles/DarkModeFix.css';

const AdminLayout = () => {
    const { logout, user } = useAuth();
    const { theme, toggleTheme } = useTheme();
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
                        <span className="brand-icon">CD</span>
                        <span className="brand-text">Civil Doctor</span>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <NavLink to="/admin/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                        <span className="nav-icon">■</span>
                        <span className="nav-text">Dashboard</span>
                    </NavLink>
                    <NavLink to="/admin/products" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                        <span className="nav-icon">▦</span>
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
                    <button onClick={toggleTheme} className="theme-toggle-sidebar-btn" title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
                        <span className="btn-icon">{theme === 'light' ? '◐' : '◑'}</span>
                        <span>{theme === 'light' ? 'Dark' : 'Light'} Mode</span>
                    </button>
                    <a href="/" className="back-to-site-btn">
                        <span className="btn-icon">←</span>
                        <span>Back to Website</span>
                    </a>
                    <button onClick={handleLogout} className="logout-btn">
                        <span className="btn-icon">⎋</span>
                        <span>Logout</span>
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
