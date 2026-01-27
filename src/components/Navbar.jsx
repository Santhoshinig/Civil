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
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
                        <svg className="logo-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M50 10L15 85H85L50 10Z" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
                            <circle cx="50" cy="55" r="12" fill="var(--accent)" className="logo-fluid" />
                            <path d="M40 45Q50 35 60 45" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                        </svg>
                    </div>
                    <span className="logo-text">
                        <div className="nav-beaker-container">
                            <div className="moving-beaker">
                                <svg viewBox="0 0 100 100" className="beaker-svg-nav">
                                    <path d="M30 20 L30 80 Q30 90 40 90 L60 90 Q70 90 70 80 L70 20" stroke="currentColor" strokeWidth="6" fill="none" />
                                    <path d="M30 50 L70 50 L70 80 Q70 90 60 90 L40 90 Q30 90 30 80 Z" fill="var(--accent)" opacity="0.6">
                                        <animate attributeName="d" dur="2s" repeatCount="indefinite"
                                            values="M30 50 L70 50 L70 80 Q70 90 60 90 L40 90 Q30 90 30 80 Z;
                                                    M30 45 L70 55 L70 80 Q70 90 60 90 L40 90 Q30 90 30 80 Z;
                                                    M30 50 L70 50 L70 80 Q70 90 60 90 L40 90 Q30 90 30 80 Z" />
                                    </path>
                                    <circle cx="40" cy="70" r="3" fill="white" opacity="0.8">
                                        <animate attributeName="cy" from="70" to="40" dur="1s" repeatCount="indefinite" />
                                        <animate attributeName="opacity" from="0.8" to="0" dur="1s" repeatCount="indefinite" />
                                    </circle>
                                    <circle cx="60" cy="65" r="4" fill="white" opacity="0.6">
                                        <animate attributeName="cy" from="65" to="35" dur="1.5s" repeatCount="indefinite" />
                                        <animate attributeName="opacity" from="0.6" to="0" dur="1.5s" repeatCount="indefinite" />
                                    </circle>
                                </svg>
                            </div>
                        </div>
                        CHEMPRO SOLUTIONS
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
