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

  return (
    <>
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
    </>
  );
}

/**
 * App Root Component
 * Handles the global routing context.
 */
function App() {
  return (
    <Router>
      <div className="App">
        <MainContent />
      </div>
    </Router>
  );
}

export default App;
