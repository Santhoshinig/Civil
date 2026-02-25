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
                                    At Civil Doctor - Salem, we care for buildings the way a doctor cares for patients.
                                </p>
                                <p>
                                    Whether it's a new construction, an aging structure, or a restoration project, we identify the root cause to deliver durable, long-lasting solutions.
                                    Since inception, we have been guided by a singular principle — <strong>Uncompromising excellence in structural integrity.</strong>
                                </p>
                                <p>
                                    Built on the conviction that true engineering extends beyond surface repair, we combine technical depth with disciplined methodology.
                                    Each project reinforces not only the strength of the structures we serve, but the confidence entrusted to us.
                                </p>
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
                        <h3>Structural solution specialist</h3>
                        <p>Civil Doctor is not a contractor — but an authority in identifying and solving complex structural challenges.</p>
                    </div>
                    <div className="phi-card">
                        <h3>Engineers permanent solutions</h3>
                        <p>We don't offer temporary fixes. We engineer systems that stand the test of time and climate.</p>
                    </div>
                    <div className="phi-card">
                        <h3>Diagnoses the unseen</h3>
                        <p>and protects the structure</p>
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
