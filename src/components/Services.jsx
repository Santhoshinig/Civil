import { useEffect, useRef, useState } from 'react';
import '../styles/Services.css';
import useTilt from '../hooks/useTilt';

/**
 * Service Definition Data 
 */
const servicesData = [
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
        ),
        title: 'Chemical Consulting',
        description:
            'Expert guidance on chemical processes, safety protocols, and regulatory compliance. Our consultants bring decades of industry experience to help optimize your operations.',
        fullDescription: 'Our chemical consulting services provide end-to-end support for industrial setups. We assist in facility design, Material Safety Data Sheet (MSDS) preparation, and environmental impact assessments. We ensure your plant operates at peak efficiency while maintaining 100% compliance with international safety standards.',
        delay: '0s',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
            </svg>
        ),
        title: 'Product Development',
        description:
            'Custom formulation and development services to create specialized chemical products that meet your exact specifications and performance requirements.',
        fullDescription: 'From initial research to pilot-scale production, our R&D team works closely with you to formulate unique chemical solutions. Whether you need a specific viscosity, heat resistance, or reaction time, we develop high-performance formulas tailored strictly to your technical use-cases.',
        delay: '0.1s',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
            </svg>
        ),
        title: 'Quality Testing',
        description:
            'Comprehensive analytical testing and quality assurance services using advanced laboratory equipment to ensure product excellence and compliance.',
        fullDescription: 'We employ advanced HPLC, GC-MS, and Spectrophotometric analysis to verify the purity and composition of every sample. Our quality control lab is equipped to test for trace contaminants, stability, and reactivity across a wide range of industrial and laboratory-grade chemicals.',
        delay: '0.2s',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
            </svg>
        ),
        title: 'Custom Solutions',
        description:
            'Tailored chemical solutions designed to address unique challenges in your industry. From concept to delivery, we partner with you every step of the way.',
        fullDescription: 'Every industry has its unique challenges. We create bespoke chemical blends and distribution strategies that solve specific logistical and performance hurdles. Our custom work spans across logistics-optimized bulk packaging to unique compound syntheses not available in the mass market.',
        delay: '0.3s',
    },
];

/**
 * ServiceCard Component
 * 
 * Individual card with 3D tilt interaction.
 */
const ServiceCard = ({ service, onClick }) => {
    const tiltRef = useTilt();
    return (
        <div
            ref={tiltRef}
            className="service-card animate-slide-left"
            style={{ animationDelay: service.delay }}
        >
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
            <span
                className="service-link"
                style={{ cursor: 'pointer' }}
                onClick={() => onClick(service)}
            >
                Know More →
            </span>
        </div>
    );
};

/**
 * Services Component
 */
const Services = () => {
    const servicesRef = useRef(null);
    const [selectedService, setSelectedService] = useState(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    } else {
                        // Logic: Remove class when out of view to re-trigger animation every time
                        entry.target.classList.remove('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );
        const elements = servicesRef.current?.querySelectorAll('.service-card');
        elements?.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section id="services" className="services-section" ref={servicesRef}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Our Services</h2>
                    <p className="section-subtitle">
                        Comprehensive chemical solutions tailored to your industry needs
                    </p>
                </div>

                <div className="services-grid">
                    {servicesData.map((service, index) => (
                        <ServiceCard
                            key={index}
                            service={service}
                            onClick={setSelectedService}
                        />
                    ))}
                </div>
            </div>

            {/* Service Detail Modal */}
            {selectedService && (
                <div className="service-modal-overlay" onClick={() => setSelectedService(null)}>
                    <div className="service-modal" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedService(null)}>×</button>
                        <div className="modal-icon">{selectedService.icon}</div>
                        <h2 className="modal-title">{selectedService.title}</h2>
                        <div className="modal-divider"></div>
                        <p className="modal-description">{selectedService.fullDescription}</p>
                        <button className="btn btn-primary" onClick={() => {
                            setSelectedService(null);
                            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                        }}>Inquire About This Service</button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Services;
