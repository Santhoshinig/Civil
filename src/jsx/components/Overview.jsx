import { useEffect, useRef } from 'react';
import '../../styles/Overview.css';

/**
 * Overview Component
 * 
 * Provides a highly visual narrative of the company's story, values, and mission.
 * Features a composite image layout, detailed philosophy cards, and a premium VM section.
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

        const elements = overviewRef.current?.querySelectorAll('.reveal');
        elements?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section className="overview-section" ref={overviewRef}>
            <div className="container">
                {/* --- About Us / Story Section --- */}
                <div className="reveal reveal-up overview-story">
                    <div className="story-grid">
                        <div className="story-text">
                            <h2 className="overview-title">Engineered Excellence. Enduring Legacy.</h2>
                            <div className="brand-accent-line"></div>

                            <div className="text-content">
                                <p className="highlight-text">
                                    Since Inception, Civil doctor has been guided by a singular principle - Uncompromising excellence in structural integrity.
                                </p>
                                <p>
                                    Built on the conviction that true engineering extends beyond surface repair, Civil doctor was established to delivery clarity in diagnosis, Precision in execution and permanence in performance.
                                </p>
                                <p>
                                    Over time, our work has come to reflect discipline methodology, technical depth and an unwavering commitment to quality. Each project reinforces not only the strength of the structures we serve, but the confidence entrusted to us.
                                </p>
                                <p>
                                    Our legacy is defined not by volume, But by durability. Not by assurances, but by measurable performance.
                                </p>
                                <p>
                                    Civil doctor continues to uphold the standards upon which it was founded - Integrity, precision and engineered permanence.
                                </p>

                                <div className="expertise-capabilities-section">
                                    <h3 className="section-inline-title">Our Expertise</h3>
                                    <p>
                                        Civil doctor delivers specialised structural and protection solutions designed to preserve integrity and extend the service life of infrastructure.
                                    </p>


                                </div>
                            </div>
                        </div>

                        <div className="story-visuals">
                            <div className="story-image-group">
                                <img src="/about.jpg" alt="Structural Repair" className="main-story-img" />
                                <div className="img-backdrop"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="reveal reveal-up philosophy-grid">
                    <div className="phi-card">
                        <h3>Structural Solution Specialist</h3>
                        <p>Civil Doctor is not a contractor - but a Structural solution specialist</p>
                    </div>
                    <div className="phi-card">
                        <h3>Permanent Solutions</h3>
                        <p>Civil Doctor doesn't offer temporary fixes - but engineer permanent Solutions</p>
                    </div>
                    <div className="phi-card">
                        <h3>Beyond Surface Repair</h3>
                        <p>Civil Doctor doesn't just repair the surface - but diagnose the unseen and protects structure</p>
                    </div>
                </div>

                {/* --- Vision & Mission --- */}
                <div className="reveal reveal-up vm-modern-grid">
                    <div className="modern-box vision">
                        <div className="box-header">
                            <span className="box-icon">⌖</span>
                            <h2>VISION</h2>
                        </div>
                        <div className="modern-points">
                            <p className="point-item">To create structures that stand strong not just today, But for generations.</p>
                            <p className="point-item">Envision a future where structural integrity is intentional, Where durability is designed from the start and where excellence is not an aspiration - but a Standard.</p>
                        </div>
                    </div>
                    <div className="modern-box mission">
                        <div className="box-header">
                            <span className="box-icon">⎎</span>
                            <h2>MISSION</h2>
                        </div>
                        <div className="modern-points">
                            <p className="point-item">To approach every project with clarity, precision and responsibility.</p>
                            <p className="point-item">To identify challenges at their route, deliver thoughtfully engineered solutions and ensure every structure we work on is safer, stronger and Built to endure.</p>
                            <p className="point-item">To uphold integrity in our assessments, discipline in our execution and permanence in our results.</p>
                        </div>
                    </div>
                </div>


                {/* --- Final Commitment Card --- */}
                <div className="reveal reveal-up commitment-card-section">
                    <div className="commitment-card">
                        <h3>Our Enduring Commitment</h3>
                        <p>
                            At Civil Doctor, we believe buildings deserve more than temporary repairs — they deserve lasting strength.
                            Every structure tells a story. Our role is to protect it, reinforce it, and ensure it stands resilient for years to come.
                            We do not measure success by completion alone, but by how well our work performs over time.
                        </p>
                        <div className="final-seal">Civil Doctor. Engineered Excellence. Enduring Legacy.</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Overview;
