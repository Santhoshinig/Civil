import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

/* Import Layout Components */
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

/* Import Pages */
import HomePage from './components/HomePage';
import ProductDetail from './components/ProductDetail';
import Products from './components/Products';
import MolecularBackground from './components/MolecularBackground';
import CustomCursor from './components/CustomCursor';

/* Import Admin Components */
import { AuthProvider } from './hooks/useAuth';
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminProducts from './admin/AdminProducts';
import ProductForm from './admin/ProductForm';
import AdminAnalytics from './admin/AdminAnalytics';
import ProtectedRoute from './admin/ProtectedRoute';

/**
 * Main App Styles
 * Organized in styles/App.css
 */
import './styles/App.css';

/**
 * Main Content Wrapper for Scroll Logic 
 */
function MainContent() {
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  // Check if current route is admin
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    /**
     * Scroll Listener Logic
     * Highlights the current navigation link based on the user's scroll position.
     * Only runs on the homepage.
     */
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    const handleScroll = () => {
      const sections = ['home', 'services', 'products', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Render admin routes separately (without main site layout)
  if (isAdminRoute) {
    return (
      <Routes>
        {/* Admin Login */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route path="/admin/*" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/new" element={<ProductForm />} />
          <Route path="products/edit/:id" element={<ProductForm />} />
          <Route path="analytics" element={<AdminAnalytics />} />
        </Route>
      </Routes>
    );
  }

  // Render main site
  return (
    <div className="public-layout">
      <CustomCursor />
      <MolecularBackground />
      <Navbar activeSection={activeSection} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products-page" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

/**
 * App Root Component
 * Handles the global routing context with Authentication.
 */
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <MainContent />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
