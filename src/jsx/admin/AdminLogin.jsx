import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../../styles/Admin.css';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Redirect to where they wanted to go, or dashboard
    const from = location.state?.from?.pathname || "/admin/dashboard";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        const result = await login(email, password);

        if (result.success) {
            navigate(from, { replace: true });
        } else {
            setError('Invalid email or password');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="admin-login-page">
            <div className="admin-login-container">
                <div className="admin-login-header">
                    <div className="admin-logo">
                        <span className="logo-icon">🏗️</span>
                        <span className="logo-text">Civil Doctor</span>
                    </div>
                    <h1>Admin Panel</h1>
                    <p>Sign in to manage your website</p>
                </div>

                {error && <div className="admin-error">{error}</div>}

                <form className="admin-login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="admin-login-btn"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="admin-login-footer">
                    <a href="/">← Back to Website</a>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
