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
        /**
         * Scroll-Reveal Logic
         * Animates image and text from opposite directions on scroll.
         */
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
                        <h2 className="section-title">About Civil Doctor</h2>
                        <p className="overview-description">
                            With over 15 years of technical expertise in civil construction, we specialize in
                            high-performance construction chemicals and protective systems. Our mission is to
                            enhance the lifespan of buildings through innovative waterproofing and structural
                            rehabilitation solutions.
                        </p>
                        <p className="overview-description">
                            From industrial epoxy flooring to advanced pest management, we serve a wide range
                            of clients across real estate, infrastructure, and industrial sectors. Our focus on
                            quality, safety, and sustainable building practices makes us a trusted partner in
                            the construction industry.
                        </p>

                        {/* Quick-Scan Features Table */}
                        <div className="overview-features">
                            <div className="feature-item">
                                <span className="feature-icon">✓</span>
                                <span>Advanced Construction Chemicals</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">✓</span>
                                <span>Expert Engineering Team</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">✓</span>
                                <span>Structural Warranty Assured</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">✓</span>
                                <span>ISO 9001:2015 Certified</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Overview;
