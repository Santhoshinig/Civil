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
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
        ),
        title: 'Epoxy Flooring',
        image: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=800&auto=format&fit=crop',
        description:
            'Durable, high-performance flooring solutions for industrial and commercial environments.',
        fullDescription: 'Our epoxy flooring systems provide a seamless, heavy-duty surface resistant to chemicals, abrasion, and heavy traffic. Ideal for factories, warehouses, and sleek modern showrooms, our solutions combine aesthetic appeal with industrial-grade strength.',
        delay: '0s',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
        title: 'Pest Control',
        image: 'https://plus.unsplash.com/premium_photo-1682126082802-983618de1dd9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVzdCUyMGNvbnRyb2x8ZW58MHx8MHx8fDA%3D',
        description:
            'Professional pest management to safeguard your property and health.',
        fullDescription: 'We provide comprehensive pest control services including anti-termite treatment, rodent control, and general pest management. Our eco-friendly approach ensures structural integrity while maintaining a safe environment for occupants.',
        delay: '0.1s',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
            </svg>
        ),
        title: 'Waterproof Systems',
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop',
        description:
            'Advanced waterproofing solutions to prevent leaks and structural decay.',
        fullDescription: 'Protect your building from water ingress with our specialized waterproofing systems. From terrace and basement waterproofing to wet area treatments, we use crystalline and membrane technologies to ensure a dry, moisture-free structure.',
        delay: '0.2s',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.7-3.7a1 1 0 000-1.4l-1.6-1.6a1 1 0 00-1.4 0l-3.7 3.7z" />
                <path d="M20 16v4a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2h4" />
            </svg>
        ),
        title: 'Repair & Rehabilitation',
        image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop',
        description:
            'Expert structural restoration and strengthening of ageing buildings.',
        fullDescription: 'We specialize in the rehabilitation of distressed structures. Our services include jacketting, polymer-modified mortar repairs, and epoxy injections to restore the load-bearing capacity and extend the life of your civil assets.',
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
            <div className="service-image-container">
                <img src={service.image} alt={service.title} className="service-card-image" />
                <div className="service-icon-overlay">{service.icon}</div>
            </div>
            <div className="service-card-body">
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
                        Advanced civil solutions for construction, protection, and structural restoration
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

            {selectedService && (
                <div className="service-modal-overlay" onClick={() => setSelectedService(null)}>
                    <div className="service-modal" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedService(null)}>×</button>
                        <div className="modal-image-container">
                            <img src={selectedService.image} alt={selectedService.title} className="modal-banner-img" />
                        </div>
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
