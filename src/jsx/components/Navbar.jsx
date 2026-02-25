import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import '../../styles/Navbar.css';
import { useContact } from '../context/ContactContext';

/**
 * Navbar Component
 */
const Navbar = ({ activeSection }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [partners, setPartners] = useState([]);
    const [theme, setTheme] = useState(document.documentElement.getAttribute('data-theme') || 'light');
    const location = useLocation();
    const navigate = useNavigate();
    const { openContact } = useContact();
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 20;
            if (scrolled !== isScrolled) setIsScrolled(scrolled);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isScrolled]);

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'partners'));
                const partnerList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setPartners(partnerList);
            } catch (error) {
                console.error("Error fetching partners:", error);
            }
        };
        fetchPartners();
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        setTheme(savedTheme);
    }, []);

    const handleNavClick = (sectionId) => {
        setIsMobileMenuOpen(false);
        if (location.pathname === '/') {
            const element = document.getElementById(sectionId);
            if (element) {
                const offset = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        } else {
            navigate(`/#${sectionId}`);
        }
    };

    // Full List of Synced Services
    const services = [
        {
            id: 'waterproofing',
            name: 'Precision Waterproofing Systems',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
            )
        },
        {
            id: 'protective-coatings',
            name: 'Protective Coating Systems',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
            )
        },
        {
            id: 'flooring',
            name: 'Building & Structural Flooring',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
            )
        },
        {
            id: 'repair-rehab',
            name: 'Structural Repair & Rehab',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.7-3.7a1 1 0 0 0 0-1.4l-1.6-1.6a1 1 0 0 0-1.4 0l-3.7 3.7z" />
                    <path d="M20 16v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4" />
                </svg>
            )
        },
        {
            id: 'structural-diagnostics',
            name: 'Structural Diagnostics',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
            )
        },
        {
            id: 'injection-grouting',
            name: 'Injection Grouting',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
            )
        },
        {
            id: 'concrete-durability',
            name: 'Concrete Protection',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" />
                </svg>
            )
        },
        {
            id: 'surface-bonding',
            name: 'Tile & Bonding Systems',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                </svg>
            )
        },
        {
            id: 'precision-grouting',
            name: 'Precision Anchoring',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" /><path d="M12 5v14" /><circle cx="12" cy="12" r="9" />
                    <path d="M12 8v8" /><path d="M8 12h8" />
                </svg>
            )
        },
        {
            id: 'fosroc',
            name: 'Fosroc Supply & Apply',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                </svg>
            )
        },
        {
            id: 'ramco-hardworker',
            name: 'Ramco Hard Worker Distributor',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 10s3-3 3-8h14s0 5 3 8v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10z" />
                    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                    <path d="M12 11v6" /><path d="M9 14h6" />
                </svg>
            )
        },
    ];

    return (
        <nav className={`navbar ${isScrolled || location.pathname !== '/' ? 'scrolled' : ''}`}>
            <div className="container nav-container">
                <div className="nav-logo" onClick={() => handleNavClick('home')}>
                    <div className="logo-wrapper">
                        <img src="/civil logo.png" alt="Civil Doctor Logo" className="logo-img" />
                    </div>
                </div>

                <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
                    <a href="/#home" className={`nav-link ${activeSection === 'home' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>Home</a>

                    <div className="nav-item-dropdown">
                        <a href="/services" className={`nav-link dropdown-trigger ${location.pathname === '/services' || location.pathname.startsWith('/service/') ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); navigate('/services'); setIsMobileMenuOpen(false); }}>Services</a>
                        {location.pathname !== '/services' && (
                            <div className="services-dropdown">
                                <div className="services-nav-list wide-dropdown">
                                    {services.map(s => (
                                        <div key={s.id} className="service-nav-item" onClick={() => { navigate(`/service/${s.id}`); setIsMobileMenuOpen(false); }}>
                                            <span className="service-nav-icon">{s.icon}</span>
                                            <span className="service-nav-name">{s.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="nav-item-dropdown">
                        <a href="/partners" className={`nav-link ${location.pathname === '/partners' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); navigate('/partners'); setIsMobileMenuOpen(false); }}>Partners</a>
                        <div className="partners-dropdown">
                            <div className="partners-grid-nav">
                                {partners.slice(0, 9).map(partner => (
                                    <div key={partner.id} className="partner-nav-item" onClick={() => { navigate(`/products-page?partner=${partner.id}`); setIsMobileMenuOpen(false); }}>
                                        <img src={partner.logo} alt={partner.name} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <a href="/#clients" className={`nav-link ${activeSection === 'clients' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNavClick('clients'); }}>Clients</a>

                    <a href="/#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}>Contact Us</a>
                </div>

                <div className="nav-actions">
                    <button className="theme-toggle-nav-btn" onClick={toggleTheme}>{theme === 'light' ? '🌙' : '☀️'}</button>
                    <button className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <span></span><span></span><span></span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
