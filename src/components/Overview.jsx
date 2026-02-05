import { useEffect, useRef } from 'react';
import '../styles/Overview.css';

/**
 * Overview Component
 * 
 * Provides detailed company context using a high-resolution laboratory image 
 * and persistent feature highlights.
 */
const Overview = () => {
    const overviewRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = overviewRef.current?.querySelectorAll('.animate-slide-left, .animate-slide-right');
        elements?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section className="overview-section" ref={overviewRef}>
            <div className="container">
                <div className="overview-grid">
                    {/* Visual Showcase Side */}
                    <div className="overview-image animate-slide-left">
                        <div className="image-placeholder">
                            <img src="/civil-doctor-avatar.png" alt="Civil Doctor Avatar" style={{ objectFit: 'contain', background: 'transparent' }} />
                        </div>
                    </div>

                    {/* Text Content Side */}
                    <div className="overview-text animate-slide-right">
                        <h2 className="section-title">LEGACY OF EXCELLENCE</h2>
                        <p className="overview-description">
                            Since its inception in <strong>1998</strong>, Civil Doctor has stood as a
                            bastion of engineering integrity, delivering bespoke solutions in
                            high-performance construction chemicals and technical restoration.
                        </p>
                        <p className="overview-description">
                            Our multidisciplinary approach harmonizes decades of on-field
                            mastery with innovative material science to ensure your structural
                            assets remain resilient, sustainable, and bone-dry.
                        </p>

                        {/* Specialty Works List */}
                        <div className="overview-features">
                            <div className="feature-item">
                                <span className="feature-icon">✓</span>
                                <span>Waterproofing (Roofs, Basements, Slabs, Tanks)</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">✓</span>
                                <span>Technical Protective Coatings & Barriers</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">✓</span>
                                <span>Industrial & Heavy-Duty Flooring Systems</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">✓</span>
                                <span>Repair & Rehabilitation of Distressed Assets</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">✓</span>
                                <span>CIDOMLITE Lightweight Structural Solutions</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">✓</span>
                                <span>High-Modulus Joint Sealant Application</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Overview;
