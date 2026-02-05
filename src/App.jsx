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
import ServicesPage from './components/ServicesPage';
import ServiceDetail from './components/ServiceDetail';
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
import BulkUpload from './admin/BulkUpload';
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
          <Route path="products/bulk" element={<BulkUpload />} />
          <Route path="products/new" element={<ProductForm />} />
          <Route path="products/edit/:id" element={<ProductForm />} />
          <Route path="analytics" element={<AdminAnalytics />} />
        </Route>
      </Routes>
    );
  }

  // Handle hash scrolling globally (for Contact Us buttons on detail pages)
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      // Use a timeout to ensure the HomePage has mounted and layouts are settled
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offset = 80; // Account for fixed navbar
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [location]);

  // Render main site
  return (
    <div className="public-layout">
      <CustomCursor />
      <MolecularBackground />
      <Navbar activeSection={activeSection} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/service/:serviceId" element={<ServiceDetail />} />
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
