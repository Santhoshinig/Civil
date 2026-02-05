import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Services.css';
import useTilt from '../hooks/useTilt';

/**
 * Service Definition Data 
 */
export const servicesData = [
    {
        id: 'waterproofing',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
            </svg>
        ),
        title: 'Waterproofing',
        image: '/waterproof.jpg',
        description: 'Advanced crystalline and membrane systems for structural integrity.',
        fullDescription: 'Civil Doctor provides absolute impermeable barriers for critical infrastructure through advanced waterproofing solutions. Our expertise covers Roofs, Sunken Slabs, Overhead Water Tanks, Roof Gardens, Basements, Sumps, Swimming Pools, and Retaining Structures.',
        subServices: ['RCC Roofs & Terraces', 'Sunken Slabs', 'Overhead Water Tanks', 'Underground Sumps', 'Swimming Pools', 'Basements & Retaining Walls'],
        delay: '0s',
    },
    {
        id: 'protective-coatings',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
            </svg>
        ),
        title: 'Protective Coatings',
        image: '/service-worker-painting-car-auto-service.jpg',
        description: 'Engineered polymer barriers against environmental weathering.',
        fullDescription: 'We deploy a range of high-performance coatings designed to defend surfaces against chemical ingress and weathering. Our solutions include Crystallisation Coatings, Silane Siloxane Impregnation, Polyurethane & Acrylic Polymer systems, and Bituminous coatings.',
        subServices: ['Crystallisation Coatings', 'Silance Siloxane Impregnation', 'Polyurethane Coatings', 'Acrylic Polymer Coatings', 'Bituminous Membrane Felt', 'Integral Admixtures'],
        delay: '0.1s',
    },
    {
        id: 'flooring',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
        ),
        title: 'Flooring',
        image: '/EPOXY-FLOORING.webp',
        description: 'Resinous flooring solutions for industrial and sterile zones.',
        fullDescription: 'Our industrial flooring systems are engineered for zero-maintenance and high durability. We cater to Storage & Logistics, Clean Rooms (Hospitals/Pharma), Production & Packing Areas, Engineering Workshops, and heavy-traffic Parking Zones.',
        subServices: ['Epoxy & PU Flooring', 'Anti-static Flooring', 'Storage & Logistics Hubs', 'Pharma Clean Rooms', 'Parking Area Systems', 'Workshop Hardscapes'],
        delay: '0.2s',
    },
    {
        id: 'repair-rehab',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.7-3.7a1 1 0 000-1.4l-1.6-1.6a1 1 0 00-1.4 0l-3.7 3.7z" />
                <path d="M20 16v4a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2h4" />
            </svg>
        ),
        title: 'Repair & Rehabilitation',
        image: '/repair-and-rehabilitation-services.jpg',
        description: 'Specialized interventions for distressed architectural assets.',
        fullDescription: 'Civil Doctor specializes in restoring the structural integrity of distressed buildings. Our rehabilitation services encompass Thermal Insulation, Spalled Roof Treatment, Beam & Column treatment, Surki restoration, and Fire Protection systems.',
        subServices: ['Spalled Roof Treatment', 'Beam & Column Restoration', 'Thermal Insulation', 'Bespoke Fire Protection', 'Sunken Filling Restoration', 'Surki Re-roofing'],
        delay: '0.3s',
    },
    {
        id: 'cidomlite',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v12M6 12h12" />
            </svg>
        ),
        title: 'CIDOMLITE',
        image: '/cidomalite.png',
        description: 'Premium lightweight thermal and structural insulation solutions.',
        fullDescription: 'CIDOMLITE is Civil Doctor’s signature lightweight structural solution. Ideal for thermal insulation and reducing dead loads in modern constructions, it provides superior efficiency in both new builds and complex rehabilitations.',
        subServices: ['Lightweight Filling', 'Thermal Insulation Slabs', 'Dead Load Reduction', 'Structural Efficiency', 'Zero-Maintenance Insulation'],
        delay: '0.4s',
    },
    {
        id: 'joint-sealants',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
        title: 'Joint Sealants',
        image: '/CONSTRUCTION JOINT SEALANT.webp',
        description: 'Elastic sealing for expansion and structural joints.',
        fullDescription: 'We provide aircraft-grade Silicone and Polyurethane sealants for precise joint management. Our systems ensure long-term UV resistance and high-modulus elasticity for Expansion Joints and structural interfaces.',
        subServices: ['Expansion Joint Sealing', 'Structural Glazing Joints', 'Perimeter Fluid Sealing', 'UV Resistant PU Sealants', 'High-Modulus Movement Joints'],
        delay: '0.5s',
    },
];

/**
 * ServiceCard Component
 */
const ServiceCard = ({ service, onClick }) => {
    const tiltRef = useTilt();
    return (
        <div
            ref={tiltRef}
            className="service-card animate-slide-left"
            style={{ animationDelay: service.delay, cursor: 'pointer' }}
            onClick={() => onClick(service.id)}
        >
            <div className="service-image-container">
                <img src={service.image} alt={service.title} className="service-card-image" />
                <div className="service-icon-overlay">{service.icon}</div>
            </div>
            <div className="service-card-body">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <span className="service-link">
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
    const navigate = useNavigate();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    } else {
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

    const handleServiceClick = (serviceId) => {
        navigate(`/service/${serviceId}`);
    };

    return (
        <section id="services" className="services-section" ref={servicesRef}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Our Services</h2>
                </div>

                <div className="services-grid">
                    {servicesData.map((service, index) => (
                        <ServiceCard
                            key={index}
                            service={service}
                            onClick={handleServiceClick}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
