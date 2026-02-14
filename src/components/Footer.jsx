import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

/**
 * Footer Component
 * 
 * Provides site-wide context, legal links, and social discovery points. 
 * Designed with a high-contrast theme for professional closure.
 */
const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                {/* Main Information Grid */}
                <div className="footer-grid">

                    {/* Brand Identity Pillar */}
                    <div className="footer-col footer-brand">
                        <div className="footer-logo">
                            <span className="logo-icon">👷</span>
                            <span className="logo-text">Civil Doctor</span>
                        </div>
                        <p className="footer-description">
                            Leading the way in high-performance construction chemicals, waterproofing
                            systems, and structural rehabilitation for modern infrastructure.
                        </p>
                        {/* Social Connection Hub */}
                        <div className="social-links">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                            </a>
                            <a href="https://wa.me/919688898230" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="WhatsApp">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.886.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.438-9.89 9.886-.001 2.15.633 4.192 1.815 5.834l-1.104 4.036 4.149-1.086zm11.41-7.149c-.314-.157-1.86-.918-2.147-1.023-.289-.104-.499-.157-.709.157-.21.314-.811 1.023-.996 1.231-.184.21-.368.236-.682.079-.314-.157-1.328-.49-2.53-1.561-.936-.835-1.566-1.867-1.75-2.18-.184-.314-.02-.485.137-.641.141-.14.314-.368.471-.551.157-.184.21-.314.314-.525.105-.21.052-.394-.026-.551-.079-.157-.709-1.707-.971-2.337-.256-.612-.516-.529-.709-.539-.183-.01-.393-.012-.603-.012s-.551.079-.839.394c-.289.314-1.102 1.076-1.102 2.625s1.128 3.045 1.285 3.255c.158.21 2.221 3.391 5.381 4.755.752.325 1.339.519 1.797.665.755.239 1.442.205 1.984.124.605-.09 1.86-.761 2.122-1.496.262-.735.262-1.365.184-1.496-.079-.131-.289-.21-.603-.368z" /></svg>
                            </a>
                        </div>
                    </div>

                    {/* Core Offerings Recap */}
                    <div className="footer-col">
                        <h4 className="footer-title">Our Services</h4>
                        <ul className="footer-links">
                            <li><Link to="/service/waterproofing">Waterproofing</Link></li>
                            <li><Link to="/service/flooring">Flooring Systems</Link></li>
                            <li><Link to="/service/protective-coatings">Protective Coatings</Link></li>
                            <li><Link to="/service/repair-rehab">Repair & Rehab</Link></li>
                            <li><Link to="/service/joint-sealants">Joint Sealants</Link></li>
                        </ul>
                    </div>

                    {/* Technical Support/Inquiry Info */}
                    <div className="footer-col">
                        <h4 className="footer-title">Contact</h4>
                        <ul className="footer-info">
                            <li>📍 No. 50, Suramangalam Main Rd, Sundaram Colony, Meyyanur, Salem - 636004</li>
                            <li>📞 +91-96888 98230 (Primary)</li>
                            <li>📞 +91-91590 40422 (Secondary)</li>
                            <li>✉️ admin@civildoctor.com</li>
                        </ul>
                    </div>
                </div>

                {/* Global Bottom Bar / Legal */}
                <div className="footer-bottom">
                    <p>Copyright &copy; 2015 Civil Doctor.       All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
