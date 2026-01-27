import React from 'react';
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
                            <a href="#" className="social-link" aria-label="Facebook">FB</a>
                            <a href="#" className="social-link" aria-label="LinkedIn">LN</a>
                            <a href="#" className="social-link" aria-label="Twitter">TW</a>
                            <a href="#" className="social-link" aria-label="Instagram">IG</a>
                        </div>
                    </div>

                    {/* Site Navigation Links */}
                    <div className="footer-col">
                        <h4 className="footer-title">Quick Links</h4>
                        <ul className="footer-links">
                            <li><a href="#home">Home</a></li>
                            <li><a href="#services">Services</a></li>
                            <li><a href="#products">Products</a></li>
                            <li><a href="#contact">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Core Offerings Recap */}
                    <div className="footer-col">
                        <h4 className="footer-title">Our Services</h4>
                        <ul className="footer-links">
                            <li><a href="#services">Epoxy Flooring</a></li>
                            <li><a href="#services">Pest Control</a></li>
                            <li><a href="#services">Waterproofing</a></li>
                            <li><a href="#services">Structural Repair</a></li>
                        </ul>
                    </div>

                    {/* Technical Support/Inquiry Info */}
                    <div className="footer-col">
                        <h4 className="footer-title">Contact</h4>
                        <ul className="footer-info">
                            <li>📍 123 Construction Hub, Build City</li>
                            <li>📞 +1 (555) 123-4567</li>
                            <li>✉️ info@civildoctor.com</li>
                        </ul>
                    </div>
                </div>

                {/* Global Bottom Bar / Legal */}
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Civil Doctor. All rights reserved.</p>
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
