import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import '../styles/Navbar.css';
import { useContact } from '../context/ContactContext';
import { useTheme } from '../context/ThemeContext';

/**
 * Navbar Component
 */
const Navbar = ({ activeSection }) => {
    const { openContact } = useContact();
    const { theme, toggleTheme } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [partners, setPartners] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'partners'));
                const partnersData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                if (partnersData.length === 0) {
                    setPartners([
                        { name: 'Ardex Endura', logo: '/partners/ardex endura.svg', id: 'ardex' },
                        { name: 'Fosroc', logo: '/partners/fosroc.svg', id: 'fosroc' },
                        { name: 'MYK Laticrete', logo: '/partners/MYK-L-Logo-1-2.svg', id: 'myk' },
                        { name: 'Ramco Cements', logo: '/partners/the_ramco_cements_limited_logo.jpg', id: 'ramco' },
                        { name: 'Allied', logo: '/partners/allied.svg', id: 'allied' }
                    ]);
                } else {
                    setPartners(partnersData);
                }
            } catch (err) {
                console.error("Error fetching partners for nav:", err);
            }
        };
        fetchPartners();
    }, []);

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
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname]);

    /**
     * Navigation Logic
     */
    const handleNavClick = (sectionId) => {
        if (location.pathname !== '/') {
            navigate(`/#${sectionId}`);
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
                        {/* 
                        <div
                            className="nav-walker-container"
                            style={{ transform: `translateX(${scrollProgress * 15}px)` }}
                        >
                            <img src="/walking-cap.png" alt="Walking Cap" className="walking-cap-mascot" />
                        </div> 
                        */}
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
                        href="/services"
                        className={`nav-link ${location.pathname === '/services' ? 'active' : ''}`}
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/services');
                            setIsMobileMenuOpen(false);
                        }}
                    >
                        Services
                    </a>
                    <div className="nav-item-dropdown">
                        <a
                            href="/partners"
                            className={`nav-link partners-dropdown-trigger ${location.pathname === '/partners' || location.pathname === '/products-page' ? 'active' : ''}`}
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/partners');
                                setIsMobileMenuOpen(false);
                            }}
                            style={{ cursor: 'pointer' }}
                        >
                            Partners
                        </a>
                        <div className="partners-dropdown">
                            <div className="partners-grid-nav">
                                {partners.map((partner) => (
                                    <div
                                        key={partner.id}
                                        className="partner-nav-item"
                                        title={partner.name}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/products-page?partner=${partner.id}`);
                                            setIsMobileMenuOpen(false);
                                        }}
                                    >
                                        <img src={partner.logo} alt={partner.name} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <a
                        href="/#clients"
                        className={`nav-link ${activeSection === 'clients' ? 'active' : ''}`}
                        onClick={(e) => { e.preventDefault(); handleNavClick('clients'); }}
                    >
                        Clients
                    </a>
                    <a
                        href="/#contact"
                        className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                        onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}
                    >
                        Contact Us
                    </a>
                </div>

                {/* Theme Toggle Button */}
                <button
                    onClick={toggleTheme}
                    className="theme-toggle-nav-btn"
                    title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                    {theme === 'light' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
                    )}
                </button>

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
