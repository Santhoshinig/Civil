import '../styles/Admin.css';

const AdminAnalytics = () => {
    return (
        <div className="admin-dashboard">
            <div className="dashboard-header">
                <h1>Analytics</h1>
                <p>Detailed performance metrics coming soon.</p>
            </div>

            <div className="empty-state" style={{ marginTop: '100px' }}>
                <span className="empty-icon">📈</span>
                <h3>Analytics Module Under Construction</h3>
                <p>We are working on bringing you detailed insights.</p>
            </div>
        </div>
    );
};

export default AdminAnalytics;
