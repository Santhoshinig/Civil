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
                            <img src="/lab-overview.png" alt="Chemical Laboratory" />
                        </div>
                    </div>

                    {/* Text Content Side */}
                    <div className="overview-text animate-slide-right">
                        <h2 className="section-title">About ChemPro Solutions</h2>
                        <p className="overview-description">
                            With over 25 years of excellence in the chemical industry, we are committed to
                            delivering innovative solutions that drive progress. Our state-of-the-art facilities
                            and expert team ensure the highest quality standards in every product we manufacture.
                        </p>
                        <p className="overview-description">
                            From industrial chemicals to specialized compounds, we serve diverse sectors including
                            pharmaceuticals, manufacturing, agriculture, and research institutions. Our commitment
                            to sustainability and safety sets us apart as an industry leader.
                        </p>

                        {/* Quick-Scan Features Table */}
                        <div className="overview-features">
                            <div className="feature-item">
                                <span className="feature-icon">✓</span>
                                <span>ISO Certified Quality</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">✓</span>
                                <span>Sustainable Practices</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">✓</span>
                                <span>Expert R&D Team</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">✓</span>
                                <span>Global Distribution</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Overview;
