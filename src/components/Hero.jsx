import { useEffect, useRef } from 'react';
import '../styles/Hero.css';
import ChemistryAnimation from './ChemistryAnimation';

/**
 * Hero Component 
 * 
 * Features a high-fidelity self-drawing chemistry animation.
 * Logic: Replaces the video with a smooth, morphing SVG animation.
 */
const Hero = () => {
    const heroRef = useRef(null);

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

            <div className="hero-content">
                <div className="hero-main-layout">
                    {/* Left Side: Professional Messaging */}
                    <div className="hero-text animate-slide-up">
                        <h1 className="hero-title">
                            <div className="title-line">
                                {"CHEMPRO".split('').map((char, index) => (
                                    <span key={index} className="char-animate" style={{ animationDelay: `${index * 0.08}s` }}>
                                        {char}
                                    </span>
                                ))}
                            </div>
                            <div className="title-line">
                                {"SOLUTIONS".split('').map((char, index) => (
                                    <span key={index} className="char-animate" style={{ animationDelay: `${(index + 7) * 0.08}s` }}>
                                        {char}
                                    </span>
                                ))}
                            </div>
                        </h1>
                        <p className="hero-subtitle">
                            Harnessing advanced synthesis and precision engineering to deliver
                            sustainable, world-class chemical solutions for global industries.
                        </p>
                        <div className="hero-buttons">
                            <button className="btn hero-btn-main" onClick={() => scrollToSection('services')}>
                                Explore Our Services
                            </button>
                            <button className="btn hero-btn-outline" onClick={() => scrollToSection('contact')}>
                                Partner With Us
                            </button>
                        </div>
                    </div>

                    {/* Right Side: High-Fidelity Chemistry Animation */}
                    <div className="hero-character-container">
                        <ChemistryAnimation />
                    </div>
                </div>

                {/* Industrial Trust Dashboard */}
                <div className="hero-stats">
                    <div className="stat-card-wrapper">
                        <div className="stat-card">
                            <div className="stat-number">25+</div>
                            <div className="stat-label">Years of Innovation</div>
                        </div>
                    </div>
                    <div className="stat-card-wrapper">
                        <div className="stat-card">
                            <div className="stat-number">500+</div>
                            <div className="stat-label">Global Partners</div>
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
