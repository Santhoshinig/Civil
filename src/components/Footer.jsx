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
                            <a href="#" className="social-link" aria-label="Facebook">FB</a>
                            <a href="#" className="social-link" aria-label="LinkedIn">LN</a>
                            <a href="#" className="social-link" aria-label="Twitter">TW</a>
                            <a href="#" className="social-link" aria-label="Instagram">IG</a>
                        </div>
                    </div>

                    {/* Core Offerings Recap */}
                    <div className="footer-col">
                        <h4 className="footer-title">Our Services</h4>
                        <ul className="footer-links">
                            <li><Link to="/services">Waterproofing</Link></li>
                            <li><Link to="/services">Flooring Systems</Link></li>
                            <li><Link to="/services">Protective Coatings</Link></li>
                            <li><Link to="/services">Repair & Rehab</Link></li>
                            <li><Link to="/services">Joint Sealants</Link></li>
                        </ul>
                    </div>

                    {/* Technical Support/Inquiry Info */}
                    <div className="footer-col">
                        <h4 className="footer-title">Contact</h4>
                        <ul className="footer-info">
                            <li>📍 #12/20, SND Layout No II, Tatabad, Coimbatore-12</li>
                            <li>📍 Branch: Chennai</li>
                            <li>📞 +91-9894600048</li>
                            <li>✉️ admin@civildoctor.com</li>
                        </ul>
                    </div>
                </div>

                {/* Global Bottom Bar / Legal */}
                <div className="footer-bottom">
                    <p>Copyright &copy; 2015 Civil Doctor. All rights reserved. Designed and Hosted by Inway</p>
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
