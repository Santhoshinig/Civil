import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
/**
 * Component-specific styles 
 * Located in organized styles directory
 */
import '../styles/Navbar.css';

/**
 * Navbar Component
 * 
 * Features smooth scrolling for SPA navigation and dynamic 
 * background/color shifts based on user scroll position.
 */
const Navbar = ({ activeSection }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Calculate scroll progress for cap movement - works on all pages
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const totalScroll = documentHeight - windowHeight;
            const scrolled = window.scrollY;
            const progress = totalScroll > 0 ? (scrolled / totalScroll) * 100 : 0;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        
        // Call once on mount to set initial state
        handleScroll();
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname]);

    /**
     * Navigation Logic
     * If on home page, scroll to section.
     * If on another page, navigate to home and scroll.
     */
    const handleNavClick = (sectionId) => {
        if (location.pathname !== '/') {
            navigate(`/#${sectionId}`);
            // Small timeout to allow navigation to complete before scrolling
            setTimeout(() => {
                scrollToSection(sectionId);
            }, 100);
        } else {
            scrollToSection(sectionId);
        }
        setIsMobileMenuOpen(false);
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <nav className={`navbar ${isScrolled || location.pathname !== '/' ? 'scrolled' : ''}`}>
            <div className="nav-container">
                {/* Brand Logo & Name */}
                <div className="nav-logo" onClick={() => handleNavClick('home')}>
                    <div className="logo-wrapper">
                        <img src="/civil-doctor-logo.png" alt="Civil Doctor Logo" className="logo-img" />
                    </div>
                    <span className="logo-text">
                        {/* Sliding Walking Cap Mascot - Moves left to right based on scroll progress */}
                        <div 
                            className="nav-walker-container"
                            style={{ transform: `translateX(${scrollProgress * 15}px)` }}
                        >
                            <img src="/walking-cap.png" alt="Walking Cap" className="walking-cap-mascot" />
                        </div>
                        CIVIL DOCTOR
                    </span>
                </div>

                {/* Desktop & Mobile Navigation Links */}
                <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
                    <a
                        href="/#home"
                        className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
                        onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
                    >
                        Home
                    </a>
                    <a
                        href="/#services"
                        className={`nav-link ${activeSection === 'services' ? 'active' : ''}`}
                        onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}
                    >
                        Services
                    </a>
                    <a
                        href="/#products"
                        className={`nav-link ${activeSection === 'products' ? 'active' : ''}`}
                        onClick={(e) => { e.preventDefault(); handleNavClick('products'); }}
                    >
                        Products
                    </a>
                    <a
                        href="/#contact"
                        className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                        onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}
                    >
                        Contact Us
                    </a>
                </div>

                {/* Hamburger Menu Icon (Mobile Only) */}
                <button
                    className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
