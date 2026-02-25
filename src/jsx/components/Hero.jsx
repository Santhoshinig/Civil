import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Hero.css';
import BuildingScanner from './BuildingScanner';
import { useContact } from '../context/ContactContext';

/**
 * Hero Component 
 * 
 * Features a high-fidelity building scanner to detect structural defects.
 */
const Hero = () => {
    const { openContact } = useContact();
    const heroRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('visible');
                });
            },
            { threshold: 0.1 }
        );
        const elements = heroRef.current?.querySelectorAll('.animate-slide-up, .hero-character-container');
        elements?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="hero-section" ref={heroRef}>
            <div className="hero-overlay"></div>

            <div className="container hero-content">
                <div className="hero-main-layout">
                    {/* Left Side: Professional Messaging */}
                    <div className="hero-text animate-slide-up">
                        <div className="hero-tagline">
                            <span>Every challenge. <span className="text-problem">Precisely Engineered</span></span>
                            <span className="text-solution">- Civil Doctor</span>
                        </div>

                        <p className="hero-subtitle">
                            Pioneering Structural Intelligence & Precision Restoration.
                            We diagnose the unseen to curate resilient, long-term engineering
                            solutions for modern infrastructure.
                        </p>
                        <div className="hero-buttons">
                            <button className="btn hero-btn-main" onClick={() => navigate('/services')}>
                                Our Services
                            </button>
                            <button className="btn hero-btn-outline" onClick={() => scrollToSection('contact')}>
                                Contact Us
                            </button>
                        </div>
                    </div>

                    {/* Right Side: Building Scanner Simulation */}
                    <div className="hero-character-container">
                        <BuildingScanner />
                    </div>
                </div>

                {/* Construction Trust Dashboard */}
                <div className="hero-stats">
                    <div className="stat-card-wrapper">
                        <div className="stat-card celebration-card">
                            <div className="popper-icon">🎉</div>
                            <div className="stat-number">25+</div>
                            <div className="stat-label">Years of Excellence</div>
                        </div>
                    </div>
                    <div className="stat-card-wrapper">
                        <div className="stat-card">
                            <div className="stat-number">500+</div>
                            <div className="stat-label">Trusted Partners</div>
                        </div>
                    </div>
                    <div className="stat-card-wrapper">
                        <div className="stat-card">
                            <div className="stat-number">100%</div>
                            <div className="stat-label">Quality Assured</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
